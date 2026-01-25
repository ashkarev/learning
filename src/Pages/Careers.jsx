import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getAllJobsApi, addApplicationApi } from '../services/allApi';
import { toast } from 'react-toastify';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationData, setApplicationData] = useState({
        name: '',
        email: '',
        resumeLink: '', // Assuming link for now, can be file if backend supports upload
        coverLetter: ''
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
                name: user.username || "", // Adjust based on user object structure
                email: user.email || ""
            });
        }
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!applicationData.name || !applicationData.email) {
            toast.warning("Please fill in required fields");
            return;
        }

        const token = localStorage.getItem("token");
        const reqHeader = token ? { "Authorization": `Bearer ${token}` } : {};

        const reqBody = {
            ...applicationData,
            jobId: selectedJob._id,
            jobTitle: selectedJob.title // Send title just in case
        };

        try {
            const result = await addApplicationApi(reqBody, reqHeader);
            if (result.status === 200 || result.status === 201) {
                toast.success("Application Submitted Successfully!");
                setIsModalOpen(false);
                setApplicationData({ name: '', email: '', resumeLink: '', coverLetter: '' });
            } else {
                if (result.response && result.response.data) {
                    toast.error(result.response.data.message);
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
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 py-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-blue-900 mb-4">Join Our Team</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore exciting career opportunities and be part of our mission to transform education.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div key={job._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-blue-500">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.type}</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {/* Description placeholder if not in job object yet */}
                                        We are looking for a talented {job.title} to join our growing team.
                                    </p>
                                    <button
                                        onClick={() => handleApply(job)}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <h3 className="text-xl text-gray-500">No open positions at the moment.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-white text-lg font-semibold">Apply for {selectedJob?.title}</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="John Doe"
                                        value={applicationData.name}
                                        onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="john@example.com"
                                        value={applicationData.email}
                                        onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (URL)</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://linkedin.com/in/..."
                                        value={applicationData.resumeLink}
                                        onChange={(e) => setApplicationData({ ...applicationData, resumeLink: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Please provide a link to your resume or portfolio.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                                    <textarea
                                        rows="3"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tell us why you're a good fit..."
                                        value={applicationData.coverLetter}
                                        onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
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
        </>
    );
};

export default Careers;
