import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar'
import {  Mail, User, Loader, Lock } from 'lucide-react'
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';

function UserSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {userAuth, signup} = useContext(UserContext);

    const navigate = useNavigate()


    const handleSubmit = async(e) => { 
        e.preventDefault();
        try {
            await signup(name,email,password);
            navigate('/user/verify-email')
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div>
            <div className="bg-white min-h-screen">
                <div>
                    <Navbar />
                </div>
                <div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                        <h2 className="text-2xl font-semibold text-center mb-4">Create your account</h2>
                        <form onSubmit={handleSubmit} noValidate>
                            <Input
                                icon={User}
                                type="text"
                                placeholder="Name*"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                icon={Mail}
                                type="email"
                                placeholder="Email*"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                icon={Lock}
                                type="password"
                                placeholder="Password*"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {userAuth.error && <p className='text-red-500 font-semibold mt-2'>{userAuth.error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                            >
                                {userAuth.isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <Link
                                to="/user/login"
                                className="text-center block text-[#111] text-lg hover:underline"
                            >
                                Already have an account? Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserSignup
