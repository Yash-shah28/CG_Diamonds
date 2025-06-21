import { Lock, Loader } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { SellerContext } from '../../context/SellerContext'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

function SellerResetPassword() {

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewpassword, setConfirmNewpassword] = useState('')

    const {sellerAuth, resetPassword} = useContext(SellerContext)

    const {token} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(newPassword !=  confirmNewpassword){
            alert("Password donot match");
            return;
        }
        try {
            await resetPassword(token,newPassword);
            toast.success("Password reset Successfully, redirecting to loign page...")
            setTimeout(() => {
                navigate('/seller/login')
            }, 2000 )
        } catch (error) {
            console.error(error);
            toast.error(error.message ||"Error resetting Password")
        }
    }
  return (
     <div>
      <div className="bg-white min-h-screen">
        <div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit} noValidate>
              <Input
                icon={Lock}
                type="password"
                placeholder="New Password*"
                name="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                icon={Lock}
                type="password"
                placeholder="Confirm New Password*"
                name="password"
                id="password"
                value={confirmNewpassword}
                onChange={(e) => setConfirmNewpassword(e.target.value)}
              />

              {sellerAuth.error && <p className='text-red-500 font-semibold mt-2'>{sellerAuth.error}</p>}

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {sellerAuth.isLoading ? "Resetting...": "Set New Password"}
              </button>
            </form>
            <div className="text-center mt-4">
              <Link
                to="/seller/signup"
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

export default SellerResetPassword
