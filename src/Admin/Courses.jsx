import React, { useState, useEffect } from 'react';
import { addCourseApi, deleteCourseApi, getAllCoursesApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', instructor: '', price: '' });

    const getCourses = async () => {
        try {
            const apiRes = await getAllCoursesApi();
            if (apiRes.status === 200) {
                setCourses(apiRes.data);
            } else {
                if (apiRes.response && apiRes.response.data) {
                    toast.error(apiRes.response.data.message);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCourses();
    }, []);

    const handleAddCourse = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please login first");
            return;
        }
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        if (!newCourse.title || !newCourse.instructor || !newCourse.price) {
            toast.warning("Please fill in all fields");
            return;
        }

        try {
            // Assuming API expects students count or defaults it, sending body
            const apiRes = await addCourseApi({ ...newCourse, students: 0 }, reqHeader);
            if (apiRes.status === 200 || apiRes.status === 201) {
                toast.success("Course added successfully");
                getCourses();
                setIsModalOpen(false);
                setNewCourse({ title: '', instructor: '', price: '' });
            } else {
                if (apiRes.response && apiRes.response.data) {
                    toast.error(apiRes.response.data.message);
                } else {
                    toast.error("Failed to add course");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleDeleteCourse = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Please login first");
            return;
        }
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const apiRes = await deleteCourseApi(id, reqHeader);
                if (apiRes.status === 200) {
                    toast.success("Course deleted successfully");
                    getCourses();
                } else {
                    if (apiRes.response && apiRes.response.data) {
                        toast.error(apiRes.response.data.message);
                    } else {
                        toast.error("Failed to delete course");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Error deleting course");
            }
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add New Course
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course.id || course._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button onClick={() => handleDeleteCourse(course.id || course._id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No courses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Course Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Course</h3>
                            <div className="mt-2 text-left space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course Title</label>
                                    <input
                                        type="text"
                                        value={newCourse.title}
                                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Instructor</label>
                                    <input
                                        type="text"
                                        value={newCourse.instructor}
                                        onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="text"
                                        value={newCourse.price}
                                        onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                                    />
                                </div>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={handleAddCourse}
                                    className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Add Course
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

export default Courses;
