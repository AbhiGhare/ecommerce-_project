import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice'; // Adjust the import path as needed
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const { status, error: apiError } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const data = await dispatch(loginUser({ email, password })).unwrap();
            console.log(data, 'data');
            if (data && data.token) {
                // Store the token in localStorage with the key 'nayahe_hai'
                localStorage.setItem('nayahe_hai', data.token);

                toast.success('Login successful!');
                navigate('/');
                // Optionally redirect or handle post-login actions
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (err) {
            toast.error('Login failed. Please check your credentials.');
            console.error('Login failed:', apiError);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>

                {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>

                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-sm">
                        <a href="#" className="text-blue-600 hover:underline mb-2 sm:mb-0">Forgot Password?</a>
                        <a href="/register" className="text-blue-600 hover:underline">Create an Account</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
