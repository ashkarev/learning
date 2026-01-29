
import React from 'react';
import { User } from 'lucide-react';

const Header = () => {
    return (
        <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 md:px-6 shadow-sm z-10">
            <div className="flex items-center">
                <div className="relative">
                    <h1 className="text-lg md:text-xl font-semibold text-gray-800">Welcome Admin</h1>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        <User className="h-5 w-5" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">Admin User</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
