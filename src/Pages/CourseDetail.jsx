import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const CourseDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const course = location.state.course;

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Course not found</h2>
                    <button
                        onClick={() => navigate('/course')}
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 py-10">
                <div className="container mx-auto px-4">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/course')}
                        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
                    >
                        ← Back to Courses
                    </button>

                    {/* Video Section */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                        <div className="aspect-w-16 aspect-h-9 relative" style={{ paddingBottom: '56.25%' }}>
                            {/* 16:9 Aspect Ratio Hack */}
                            <iframe
                                src={`https://www.youtube.com/embed/${course.videoId}`} // Default fallback
                                title={course.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                    {/* Course Info */}
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
                                <p className="text-gray-600 text-lg">Instructor: <span className="font-semibold text-blue-600">{course.teacher}</span></p>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <span className="block text-2xl font-bold text-blue-600 mb-2">{course.price}</span>
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                                    Enroll Now
                                </button>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        <div className="prose max-w-none text-gray-700">
                            <h3 className="text-xl font-semibold mb-3">About this Course</h3>
                            <p>
                                {course.description || "This course covers everything you need to know about " + course.title + ". Join thousands of students learning today!"}
                            </p>
                            <div className="mt-6 flex gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <span className="block text-sm text-gray-500">Duration</span>
                                    <span className="font-semibold">{course.hours}</span>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <span className="block text-sm text-gray-500">Level</span>
                                    <span className="font-semibold">Beginner to Advanced</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CourseDetail;
