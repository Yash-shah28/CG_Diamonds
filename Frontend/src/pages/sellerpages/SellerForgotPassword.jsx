import React, { useContext, useState } from 'react'
import { SellerContext } from '../../context/SellerContext';

import Input from '../../components/Input';
import { ArrowLeft, Mail, Loader} from 'lucide-react';
import { Link } from 'react-router-dom';

function SellerForgotPassword() {

    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { sellerAuth, forgotPassowrd } = useContext(SellerContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        await forgotPassowrd(email);
        setIsSubmitted(true)

    }
    return (
        <div>
            <div className="bg-white min-h-screen">
                <div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

                        {!isSubmitted ? (
                            <>
                                <p className="text-gray-600 text-center mb-6">
                                    Enter your email address and we'll send you a link to reset your password
                                </p>
                                <form onSubmit={handleSubmit} noValidate>
                                    <Input
                                        icon={Mail}
                                        type="email"
                                        placeholder="Email*"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />

                                    {sellerAuth.error && <p className='text-red-500 font-semibold mt-2'>{sellerAuth.error}</p>}

                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                                    >
                                        {sellerAuth.isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Send Reset Link"}
                                    </button>
                                </form>
                                
                            </>
                        ) : (
                            <>
                                <p className="text-gray-600 text-center mb-6">
                                    If an account exists for {email}, you will recieve a password reset link shortly.
                                </p>
                            </>
                        )}
                        <div className="text-center mt-4">
                            <Link
                                to="/seller/login"
                                className="text-center block text-[#111] text-lg hover:underline"
                            >
                            Back to Login
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerForgotPassword
