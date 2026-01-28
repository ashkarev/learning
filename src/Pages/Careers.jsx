import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getAllJobsApi, applyJobApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Briefcase, MapPin, Calendar, Clock, DollarSign, Upload, FileText } from 'lucide-react';

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
                setJobs(result.data);
            } else {
                console.error("Failed to fetch jobs");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleApply = (job) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setApplicationData({
                ...applicationData,
                fullName: user.userName || "",
                email: user.email || ""
            });
        }
        setSelectedJob(job);
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
        const reqHeader = {
            "Content-Type": "multipart/form-data"
        };
        if (token) {
            reqHeader["Authorization"] = `Bearer ${token}`;
        }

        try {
            const result = await applyJobApi(formData, reqHeader);
            if (result.status === 200 || result.status === 201) {
                toast.success("Application Submitted Successfully!");
                setIsModalOpen(false);
                setApplicationData({ fullName: '', email: '', phone: '', resume: null });
            } else {
                if (result.response && result.response.data) {
                    toast.error(result.response.data.message || "Submission failed");
                } else {
                    toast.error("Failed to submit application");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-slate-50 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                            Shape the Future of Learning
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Join our vibrant team and help us build the next generation of educational tools.
                            Explore our open positions below.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-all duration-300 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800 mb-2">{job.jobRole}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1"><Briefcase size={16} /> {job.experience}</span>
                                                <span className="flex items-center gap-1"><DollarSign size={16} /> {job.salary}</span>
                                            </div>
                                        </div>
                                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Job ID: {job.jobId}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 mb-8 leading-relaxed line-clamp-4">
                                        {job.jobDesc}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div className="text-xs text-slate-400">
                                            <p>Posted: {job.jobDate}</p>
                                            <p className="text-red-400 font-medium">Deadline: {job.lastDate}</p>
                                        </div>
                                        <button
                                            onClick={() => handleApply(job)}
                                            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition duration-300 font-bold shadow-lg shadow-blue-200"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full bg-white rounded-2xl p-16 text-center border-2 border-dashed border-slate-200">
                                <Briefcase className="mx-auto text-slate-300 mb-4" size={48} />
                                <h3 className="text-xl font-semibold text-slate-500">No open positions at the moment.</h3>
                                <p className="text-slate-400 mt-2">Check back later for new opportunities!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
                            <div>
                                <h3 className="text-xl font-bold">Apply for Position</h3>
                                <p className="text-slate-400 text-sm mt-1">{selectedJob?.jobRole}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors"
                            >
                                <span className="text-2xl leading-none">&times;</span>
                            </button>
                        </div>
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                        placeholder="Enter your full name"
                                        value={applicationData.fullName}
                                        onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                            placeholder="your@email.com"
                                            value={applicationData.email}
                                            onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                            placeholder="Phone Number"
                                            value={applicationData.phone}
                                            onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Resume (PDF or DOC)</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            required
                                            accept=".pdf,.doc,.docx"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.files[0] })}
                                        />
                                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl px-4 py-8 text-center group-hover:border-blue-400 group-hover:bg-blue-50 transition-all duration-300">
                                            {applicationData.resume ? (
                                                <div className="flex flex-col items-center text-blue-600">
                                                    <FileText size={32} className="mb-2" />
                                                    <span className="font-bold">{applicationData.resume.name}</span>
                                                    <span className="text-xs text-slate-400 mt-1">{(applicationData.resume.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center text-slate-400">
                                                    <Upload size={32} className="mb-2" />
                                                    <span className="font-medium">Click or drag resume here</span>
                                                    <span className="text-xs mt-1">PDF, DOC, DOCX up to 5MB</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition duration-300 font-bold text-lg shadow-xl shadow-blue-100"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Careers;
