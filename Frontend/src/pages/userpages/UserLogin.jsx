import { useContext, useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { Loader, Lock, Mail } from 'lucide-react';
import { UserContext } from '../../context/UserContext';

function UserLogin() {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {userAuth, login} = useContext(UserContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await login(email,password);
      navigate('/');
    } catch(error){
      console.log(error);
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
            <h2 className="text-2xl font-semibold text-center mb-4">Welcome back to CG Diamond</h2>
            <form onSubmit={handleSubmit} noValidate>
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
              <div className='flex items-center justify-between mb-4'>
                <Link
                  to="/user/forgot-password"
                  className="text-center block text-[#111] text-lg hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {userAuth.error && <p className='text-red-500 font-semibold mt-2'>{userAuth.error}</p>}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {userAuth.isLoading ? <Loader className='animate-spin mx-auto' size={24}/>: "Login"}
              </button>
            </form>
            <div className="text-center mt-4">
              <Link
                to="/user/signup"
                className="text-center block text-[#111] text-lg hover:underline"
              >
                Don't have an account? Signup
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserLogin
