import React, { useState, useEffect } from 'react';
import { addJobApi, deleteJobApi, getAllJobsApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const AdminCareers = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', type: 'Full-time', location: '', status: 'Open' });

    const getJobs = async () => {
        try {
            const apiRes = await getAllJobsApi();
            if (apiRes.status === 200) {
                setJobs(apiRes.data);
            } else {
                console.log(apiRes);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getJobs();
    }, []);

    const handleAddJob = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please login first");
            return;
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        if (!newJob.title || !newJob.location) {
            toast.warning("Please fill in all required fields (Title, Location)");
            return;
        }

        try {
            const apiRes = await addJobApi(newJob, reqHeader);
            if (apiRes.status === 200 || apiRes.status === 201) {
                toast.success("Job added successfully");
                getJobs();
                setIsModalOpen(false);
                setNewJob({ title: '', type: 'Full-time', location: '', status: 'Open' });
            } else {
                if (apiRes.response && apiRes.response.data) {
                    toast.error(apiRes.response.data.message);
                } else {
                    toast.error("Failed to add job");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleDeleteJob = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please login first");
            return;
        }
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        if (window.confirm("Are you sure you want to delete this job?")) {
            try {
                const apiRes = await deleteJobApi(id, reqHeader);
                if (apiRes.status === 200) {
                    toast.success("Job deleted successfully");
                    getJobs();
                } else {
                    if (apiRes.response && apiRes.response.data) {
                        toast.error(apiRes.response.data.message);
                    } else {
                        toast.error("Failed to delete job");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Error deleting job");
            }
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Careers </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add New Job
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <tr key={job._id || job.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button onClick={() => handleDeleteJob(job._id || job.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No jobs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Simple Modal Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Job Post</h3>
                            <div className="mt-2 text-left space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                    <input
                                        type="text"
                                        value={newJob.title}
                                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <select
                                        value={newJob.type}
                                        onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        value={newJob.location}
                                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                    />
                                </div>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={handleAddJob}
                                    className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Add Job
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-3 px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCareers;
