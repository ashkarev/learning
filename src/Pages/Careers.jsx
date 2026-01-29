import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getAllJobsApi, applyJobApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Briefcase, Upload, FileText } from 'lucide-react';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationData, setApplicationData] = useState({
        fullName: '',
        email: '',
        phone: '',
        resume: null
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const result = await getAllJobsApi();
            if (result.status === 200) {
                setJobs(result.data.allJobs || []);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setApplicationData({
            fullName: '',
            email: '',
            phone: '',
            resume: null
        });
        setSelectedJob(null);
    };


    const handleApply = (job) => {
        setSelectedJob(job);
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setApplicationData({
                    fullName: user.userName || "",
                    email: user.email || "",
                    phone: '',
                    resume: null
                });
            } catch (e) {
                console.error(e);
                setApplicationData({
                    fullName: '',
                    email: '',
                    phone: '',
                    resume: null
                });
            }
        } else {
            setApplicationData({
                fullName: '',
                email: '',
                phone: '',
                resume: null
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phone, resume } = applicationData;

        if (!fullName || !email || !phone || !resume) {
            toast.warning("Please fill in all fields and upload your resume");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("resume", resume);
        formData.append("jobId", selectedJob.jobId);
        formData.append("jobTitle", selectedJob.jobRole);

        const token = localStorage.getItem("token");
        const reqHeader = { "Content-Type": "multipart/form-data" };
        if (token) {
            reqHeader["Authorization"] = `Bearer ${token}`;
        }

        try {
            const result = await applyJobApi(formData, reqHeader);
            if (result.status === 200 || result.status === 201) {
                toast.success("Application Submitted!");
                handleCloseModal();
            } else {
                toast.error(result.response?.data?.message || "Submission failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow bg-white py-12 mt-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-8 md:mb-12 border-b pb-6 md:pb-8 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-blue-500 mb-2">Careers</h1>
                        <p className="text-lg md:text-2xl text-gray-600">Explore open positions and join our team.</p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job._id || job.jobId} className="border rounded-lg p-4 md:p-6 hover:border-blue-500 transition-colors bg-slate-50">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-800">{job.jobRole}</h3>
                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500 uppercase tracking-tight font-medium">
                                                <span>{job.experience}</span>
                                                <span className="text-emerald-600 font-bold">{job.salary}</span>
                                                <span className="text-red-400">Deadline: {job.lastDate}</span>
                                            </div>
                                            <p className="mt-4 text-gray-600 line-clamp-2 text-xs md:text-sm leading-relaxed">
                                                {job.jobDesc}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleApply(job)}
                                            className="bg-blue-600 text-white px-8 py-2.5 rounded hover:bg-blue-700 transition-colors font-bold text-sm whitespace-nowrap"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 border-2 border-dashed rounded-lg">
                                <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
                                <h3 className="text-xl font-medium text-gray-400">No active job listings</h3>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">Apply for {selectedJob?.jobRole}</h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    value={applicationData.fullName}
                                    onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        value={applicationData.email}
                                        onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        value={applicationData.phone}
                                        onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF/DOC)</label>
                                <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-slate-50 cursor-pointer relative">
                                    <input
                                        type="file"
                                        required
                                        accept=".pdf,.doc,.docx"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.files[0] })}
                                    />
                                    {applicationData.resume ? (
                                        <div className="flex flex-col items-center text-blue-600">
                                            <FileText size={24} className="mb-1" />
                                            <span className="text-xs font-bold">{applicationData.resume.name}</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-400">
                                            <Upload size={24} className="mb-1" />
                                            <span className="text-xs">Select Resume File</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">Submit Application</button>
                                <button type="button" onClick={handleCloseModal} className="flex-1 bg-gray-100 text-gray-700 font-bold py-2 rounded hover:bg-gray-200">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Careers;
