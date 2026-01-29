import React, { useEffect, useState } from 'react';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getAllCoursesApi, getAllUsersApi } from '../services/allApi';

const AdminHome = () => {
    const [userCount, setUserCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const reqHeader = token ? { "Authorization": `Bearer ${token}` } : {};

        try {
            const userRes = await getAllUsersApi(reqHeader);
            if (userRes.status === 200) {
                setUserCount(userRes.data.length);
            }
        } catch (error) {
            console.error("Error fetching users for dashboard", error);
        }

        try {
            const courseRes = await getAllCoursesApi(reqHeader);
            if (courseRes.status === 200) {
                setCourseCount(courseRes.data.length);
            }
        } catch (error) {
            console.error("Error fetching courses for dashboard", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const stats = [
        { name: 'Total Users', value: userCount, icon: Users, change: '+12%', changeType: 'positive' },
        { name: 'Active Courses', value: 6, icon: BookOpen, change: '+5%', changeType: 'positive' },
        { name: 'Total Revenue', value: '$1000', icon: DollarSign, change: '+0%', changeType: 'neutral' }, // Placeholder
        { name: 'Growth', value: '75%', icon: TrendingUp, change: '+0%', changeType: 'neutral' }, // Placeholder
    ];

    const data = [
        { name: 'Jan', users: 400, courses: 240 },
        { name: 'Feb', users: 300, courses: 139 },
        { name: 'Mar', users: 200, courses: 980 },
        { name: 'Apr', users: 278, courses: 390 },
        { name: 'May', users: 189, courses: 480 },
        { name: 'Jun', users: 239, courses: 380 },
        { name: 'Jul', users: 349, courses: 430 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{item.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <span className={`font-medium ${item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.change}
                                </span>
                                <span className="text-gray-500"> from last month</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10 md:pb-0">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Line type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Sales</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="courses" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
