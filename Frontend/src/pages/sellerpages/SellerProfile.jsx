/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Building2, Loader, Lock, Mail, Phone, User } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';


import Layout from '../../components/SellerLayout';
import Input from '../../components/Input';
import { SellerContext } from '../../context/SellerContext';


export default function SellerProfile() {
    let [email, setEmail] = useState('');
    let [firstname, setFirstname] = useState('');
    let [lastname, setLastname] = useState('');
    let [pnumber, setPnumber] = useState('');
    let [company, setCompany] = useState('');
    let [address, setAddress] = useState('')

    const { sellerAuth, updateSeller, updateSellerPassword } = useContext(SellerContext);
    const navigate = useNavigate();


    const [showPasswordForm, setShowPasswordForm] = useState(false);
    let [password, setPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');


    useEffect(() => {
        setEmail(sellerAuth.seller.email);
        setCompany(sellerAuth.seller.company)
        setFirstname(sellerAuth.seller.firstname);
        setLastname(sellerAuth.seller.lastname);
        setPnumber(sellerAuth.seller.pnumber)
        setAddress(sellerAuth.seller.address)
    });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSeller(firstname, lastname, email, pnumber, company, address)
        } catch (err) {
            console.log(err);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match");
            return;
        }
        try {
            await updateSellerPassword(password, newPassword);
            navigate('/seller/settings')
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <div className="w-full px-4 sm:px-10 mt-10">
                <h2 className="text-3xl font-bold mb-6">User Profile</h2>

                <div className="flex space-x-4 mb-6">
                    <button
                        className={`px-5 py-2 rounded ${!showPasswordForm ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onClick={() => setShowPasswordForm(false)}
                    >
                        Profile Info
                    </button>
                    <button
                        className={`px-5 py-2 rounded ${showPasswordForm ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onClick={() => setShowPasswordForm(true)}
                    >
                        Change Password
                    </button>
                </div>

                {!showPasswordForm ? (
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input
                                icon={User}
                                type="text"
                                placeholder="Firstname*"
                                name="firstname"
                                id="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <Input
                                icon={User}
                                type="text"
                                placeholder="Lastname"
                                name="lastname"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
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
                            icon={Phone}
                            type="number"
                            placeholder="Phone Number*"
                            name="pnumber"
                            id="pnumber"
                            value={pnumber}
                            onChange={(e) => setPnumber(e.target.value)}
                        />
                        <Input
                            icon={Building2}
                            type="text"
                            placeholder="Company Name*"
                            name="company"
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <div className="mb-6">
                            <textarea
                                name="address"
                                id="address"
                                placeholder="Company address*"
                                cols="50"
                                rows="5"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
                        >
                            Update Profile
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <Input
                            icon={Mail}
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            id="email"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type="password"
                            name="NewPassword"
                            placeholder="New Password"
                            id="NewPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
                        >
                            Change Password
                        </button>
                    </form>
                )}
            </div>
        </Layout>


    );
}
