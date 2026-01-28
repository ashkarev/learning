import React, { useState, useEffect } from 'react';
import { addJobApi, deleteJobApi, getAllJobsApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Trash2, Plus, Calendar, Briefcase, DollarSign, Clock, MapPin } from 'lucide-react';

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
                if (apiRes.response && apiRes.response.data) {
                    toast.error(apiRes.response.data.message || "Failed to add job");
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
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Carrer Management</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> Add New Job
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <tr key={job._id || job.id} className="hover:bg-gray-50 transition-colors text-sm">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{job.jobId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold">{job.jobRole}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.experience}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.salary}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.jobDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{job.lastDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            <button onClick={() => handleDeleteJob(job._id || job.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No jobs found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
                    <div className="relative p-6 border w-full max-w-2xl shadow-xl rounded-xl bg-white">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b">
                            <h3 className="text-xl font-bold text-gray-800">Create New Job Posting</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
                        </div>
                        <form onSubmit={handleAddJob} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job ID</label>
                                    <input
                                        type="text"
                                        required
                                        value={newJob.jobId}
                                        onChange={(e) => setNewJob({ ...newJob, jobId: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 outline-none"
                                        placeholder="EX: JOB001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                    <input
                                        type="text"
                                        required
                                        value={newJob.jobRole}
                                        onChange={(e) => setNewJob({ ...newJob, jobRole: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 outline-none"
                                        placeholder="Software Engineer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                    <input
                                        type="text"
                                        required
                                        value={newJob.experience}
                                        onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 outline-none"
                                        placeholder="2-4 Years"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                                    <input
                                        type="text"
                                        required
                                        value={newJob.salary}
                                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 outline-none"
                                        placeholder="5-8 LPA"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Posted Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={newJob.jobDate}
                                        onChange={(e) => setNewJob({ ...newJob, jobDate: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Date to Apply</label>
                                    <input
                                        type="date"
                                        required
                                        value={newJob.lastDate}
                                        onChange={(e) => setNewJob({ ...newJob, lastDate: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={newJob.jobDesc}
                                    onChange={(e) => setNewJob({ ...newJob, jobDesc: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 outline-none resize-none"
                                    placeholder="Provide detailed job description..."
                                ></textarea>
                            </div>
                            <div className="flex gap-4 pt-4 border-t">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                                >
                                    Publish Job
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCareers;
