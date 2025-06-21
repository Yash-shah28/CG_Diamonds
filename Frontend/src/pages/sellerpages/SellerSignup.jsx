import {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import Input from '../../components/Input.jsx';
import { Building2, Loader, Lock, Mail, Phone, User } from 'lucide-react';
import { SellerContext } from '../../context/SellerContext.jsx';

function SellerSignup() {

  let [firstname, setFirstname] = useState('');
  let [lastname, setLastname] = useState('');
  let [email, setEmail] = useState('');
  let [pnumber, setPnumber] = useState('');
  let [password, setPassword] = useState('');
  let [company, setCompany] = useState('');
  let [address, setAddress] = useState('');
  const navigate = useNavigate()

  const {signup, sellerAuth } = useContext(SellerContext)
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await signup(firstname, lastname,email,pnumber,password,company,address);
      navigate('/seller/verify-email')

    } catch(error){
      console.log(error)
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
                          <h2 className="text-2xl font-semibold text-center mb-4">Create Seller Account</h2>
                          <p className="text-gray-600 text-center mb-6">
                              Join our marketplace and start selling diamonds
                          </p>
                          <form onSubmit={handleSubmit}  noValidate>
                            <Input
                              icon= {User}
                              type="text"
                              placeholder="Firstname*"
                              name="firstname"
                              id="firstname"
                              value= {firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                            />
                             <Input
                              icon= {User}
                              type="text"
                              placeholder="Lastname"
                              name="lastname"
                              id="lastname"
                              value= {lastname}
                              onChange={(e) => setLastname(e.target.value)}
                            />
                             <Input
                              icon= {Mail}
                              type="email"
                              placeholder="Email*"
                              name="email"
                              id="email"
                              value= {email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                              icon= {Phone}
                              type="number"
                              placeholder="Phone Number*"
                              name="pnumber"
                              id="pnumber"
                              value= {pnumber}
                              onChange={(e) => setPnumber(e.target.value)}
                            />
                            <Input
                              icon= {Lock}
                              type="password"
                              placeholder="Password*"
                              name="password"
                              id="password"
                              value= {password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                              icon= {Building2}
                              type="text"
                              placeholder="Company Name*"
                              name="company"
                              id="company"
                              value= {company}
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

                              {sellerAuth.error && <p className='text-red-500 font-semibold mt-2'>{sellerAuth.error}</p>}
                              
                              
                              <button
                                  type="submit"
                                  className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                                  disabled = {sellerAuth.isLoading}
                              >
                               {sellerAuth.isLoading ? <Loader className='animate-spin mx-auto' size={24}/>: "sign Up"}
                              </button>
                          </form>
                          <div className="text-center mt-4">
                              <Link 
                                  to="/seller/login" 
                                  className="text-center block text-[#111] text-lg hover:underline"
                              >
                                  Already have a seller account? Log in
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>
      
    </div>
  )
}

export default SellerSignup
