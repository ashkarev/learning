import React, { useState, useEffect } from 'react';
import { addJobApi, deleteJobApi, getAllJobsApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const AdminCareers = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newJob, setNewJob] = useState({
        jobId: '',
        jobRole: '',
        jobDesc: '',
        jobDate: '',
        lastDate: '',
        salary: '',
        experience: ''
    });

    const getJobs = async () => {
        try {
            const apiRes = await getAllJobsApi();
            if (apiRes.status === 200) {
                setJobs(apiRes.data.allJobs || []);
            } else {
                setJobs([]);
            }
        } catch (error) {
            console.error(error);
            setJobs([]);
        }
    }

    useEffect(() => {
        getJobs();
    }, []);

    const handleAddJob = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please login first");
            return;
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        const { jobId, jobRole, jobDesc, jobDate, lastDate, salary, experience } = newJob;
        if (!jobId || !jobRole || !jobDesc || !jobDate || !lastDate || !salary || !experience) {
            toast.warning("Please fill in all fields");
            return;
        }

        try {
            const apiRes = await addJobApi(newJob, reqHeader);
            if (apiRes.status === 200 || apiRes.status === 201) {
                toast.success("Job added successfully");
                getJobs();
                setIsModalOpen(false);
                setNewJob({
                    jobId: '',
                    jobRole: '',
                    jobDesc: '',
                    jobDate: '',
                    lastDate: '',
                    salary: '',
                    experience: ''
                });
            } else {
                const errMsg = apiRes.response?.data?.message || "Failed to add job";
                toast.error(errMsg);
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

        // if (window.confirm("Are you sure you want to delete this job?")) {
        try {
            const apiRes = await deleteJobApi(id, reqHeader);
            if (apiRes.status === 200) {
                toast.success("Job deleted successfully");
                getJobs();
            } else {
                toast.error("Failed to delete job");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting job");
        }
        // }
    }

    const generateId = () => {
        setNewJob({ ...newJob, jobId: `JOB-${Math.floor(1000 + Math.random() * 9000)}` });
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Job Management</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add New Job
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-x-auto border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <tr key={job._id || job.jobId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.jobId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.jobRole}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.experience}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.salary}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.lastDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button onClick={() => handleDeleteJob(job._id || job.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No jobs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
                    <div className="relative p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">Add New Job Posting</h3>
                            <form onSubmit={handleAddJob} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-sm font-medium text-gray-700">Job ID</label>
                                            <button type="button" onClick={generateId} className="text-[10px] text-blue-600 hover:underline">Auto</button>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={newJob.jobId}
                                            onChange={(e) => setNewJob({ ...newJob, jobId: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                        <input
                                            type="text"
                                            required
                                            value={newJob.jobRole}
                                            onChange={(e) => setNewJob({ ...newJob, jobRole: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                        <input
                                            type="text"
                                            required
                                            value={newJob.experience}
                                            onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                                        <input
                                            type="text"
                                            required
                                            value={newJob.salary}
                                            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Post Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={newJob.jobDate}
                                            onChange={(e) => setNewJob({ ...newJob, jobDate: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={newJob.lastDate}
                                            onChange={(e) => setNewJob({ ...newJob, lastDate: e.target.value })}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        required
                                        rows="3"
                                        value={newJob.jobDesc}
                                        onChange={(e) => setNewJob({ ...newJob, jobDesc: e.target.value })}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                    ></textarea>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                                    >
                                        Add Job
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCareers;
