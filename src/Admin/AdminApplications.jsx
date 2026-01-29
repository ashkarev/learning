import React, { useState, useEffect } from 'react';
import { deleteApplicationApi, getAllApplicationsApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Trash2, ExternalLink } from 'lucide-react';
import { baseUrl } from '../services/baseUrl';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);

    const getApplications = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please login first");
            return;
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        try {
            const apiRes = await getAllApplicationsApi(reqHeader);
            if (apiRes.status === 200) {
                const appsData = apiRes.data.applications || [];
                setApplications(Array.isArray(appsData) ? appsData : []);
            } else {
                setApplications([]);
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error(error.response?.data?.message || "Failed to fetch applications");
            setApplications([]);
        }
    }

    useEffect(() => {
        getApplications();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please login first");
            return;
        }
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        if (window.confirm("Are you sure you want to delete this application?")) {
            try {
                const apiRes = await deleteApplicationApi(id, reqHeader);
                if (apiRes.status === 200) {
                    toast.success("Application removed");
                    getApplications();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Job Applications</h2>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-x-auto border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied For</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.length > 0 ? (
                            applications.map((app, index) => (
                                <tr key={app._id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.fullName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>{app.email}</div>
                                        <div className="text-xs">{app.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.jobTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 font-medium">
                                        <a href={`${baseUrl}/uploads/${app.resume}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                            View Resume <ExternalLink size={14} />
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button onClick={() => handleDelete(app._id || app.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No applications found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminApplications;
