import React, { useState, useEffect } from 'react';
import { deleteApplicationApi, getAllApplicationsApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Trash2, ExternalLink, User, Mail, Phone, Briefcase } from 'lucide-react';
import { baseUrl } from '../services/baseUrl';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);

    const getApplications = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const apiRes = await getAllApplicationsApi(reqHeader);
                if (apiRes.status === 200) {
                    setApplications(apiRes.data);
                } else {
                    if (apiRes.response && apiRes.response.data) {
                        toast.error(apiRes.response.data.message);
                    } else {
                        toast.error("Failed to fetch applications");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong while fetching applications");
            }
        } else {
            toast.warning("Please login first");
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
                    toast.success("Application deleted successfully");
                    getApplications();
                } else {
                    if (apiRes.response && apiRes.response.data) {
                        toast.error(apiRes.response.data.message);
                    } else {
                        toast.error("Failed to delete application");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Error deleting application");
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Received Applications</h2>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied For</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.length > 0 ? (
                                applications.map((app, index) => (
                                    <tr key={app._id || index} className="hover:bg-gray-50 transition-colors text-sm">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-semibold text-gray-900">{app.fullName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail size={14} /> {app.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Phone size={14} /> {app.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-blue-700 font-medium">
                                                <Briefcase size={14} /> {app.jobTitle}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">ID: {app.jobId}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {app.resume ? (
                                                <a
                                                    href={`${baseUrl}/uploads/${app.resume}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium border-b border-blue-600"
                                                >
                                                    View Resume <ExternalLink size={14} />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No Resume</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(app._id || app.id)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                                title="Delete Application"
                                            >
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
        </div>
    );
};

export default AdminApplications;
