import React, { useState, useEffect } from 'react';
import { deleteApplicationApi, getAllApplicationsApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

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

    const renderCell = (content) => {
        if (content === null || content === undefined) return '';
        if (typeof content === 'object') return JSON.stringify(content); // Fallback for objects
        return content;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Applications</h2>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            {/* Adjust headers based on actual API response structure */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.length > 0 ? (
                            applications.map((app, index) => (
                                <tr key={app._id || index} className="hover:bg-gray-50 transition-colors">
                                    {/* Adjust fields based on actual API response structure. Assuming common fields here. */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {renderCell(app.name || app.applicantName || app.studentId?.username)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {renderCell(app.email || app.applicantEmail || app.studentId?.email)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {renderCell(app.jobTitle || app.jobId?.title || "N/A")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {renderCell(app.status || "Applied")}
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
