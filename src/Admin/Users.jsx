import React, { useEffect, useState } from 'react';
import { getAllUsersApi } from '../services/allApi';
import { toast } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const apiRes = await getAllUsersApi(reqHeader);
                if (apiRes.status === 200) {
                    setUsers(apiRes.data);
                } else {
                    if (apiRes.response && apiRes.response.data) {
                        toast.error(apiRes.response.data.message);
                    } else {
                        toast.error("Failed to fetch users");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong while fetching users");
            }
        } else {
            toast.warning("Please login first");
        }
    }; // Corrected closing brace for getUsers

    useEffect(() => {
        getUsers();
    }, []);

    // Helper function to render valid table cell content
    const renderCell = (content) => {
        if (content === null || content === undefined) return '';
        if (typeof content === 'object') return JSON.stringify(content);
        return content;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
            <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{renderCell(user.userName)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(user.email)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderCell(user.userType)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
