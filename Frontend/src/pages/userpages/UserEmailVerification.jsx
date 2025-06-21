/* eslint-disable react-hooks/exhaustive-deps */
import {  useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {Loader} from 'lucide-react'
import { UserContext } from '../../context/UserContext';





function UserEmailVerification() {

    let [code, setCode] = useState(["", "", "", "", "", ""]);
    let inputRef = useRef([]);
    const navigate = useNavigate();

    const {userAuth,verifyEmail} = useContext(UserContext);


    const handlechange = (index, value) => {
        const newCode = [...code];

        if(value.length > 1){
            const pastedCode = value.slice(0, 6).split('');
            for(let i = 0; i < 6; i++){
                newCode[i] = pastedCode[i] || '';
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex(digit => digit !== '');
            const focusIndex = lastFilledIndex <5 ? lastFilledIndex + 1 : 5;
            inputRef.current[focusIndex].focus();

        }
        else{
            newCode[index] =value;
            setCode(newCode);

            if(value && index < 5) {
                inputRef.current[index + 1].focus();
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if(e.key === 'Backspace' && index > 0 && !code[index]) {
            inputRef.current[index - 1].focus();
        }
    }
    const handlesubmit = async(e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success(userAuth.message)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handlesubmit(new Event('submit'));
        }

    }, [code]);




    return (
        <div>
            <div className="bg-white min-h-screen">
                
                <div className=" pt-25 flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                        <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Email</h2>
                        <p className="text-gray-600 text-center mb-6">
                            Enter the 6-digit code sent to your email address
                        </p>
                        <form onSubmit={handlesubmit} noValidate>
                            <div className='flex justify-between mb-4'>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => inputRef.current[index] = el}
                                        type="text"
                                        maxLength="6"
                                        value={digit}
                                        onChange={(e) => handlechange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                ))}
                            </div>
                            {userAuth.error && <p className='text-red-500 font-semibold mt-2'>{userAuth.error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                                disabled = {userAuth.isLoading}
                            >
                               {userAuth.isLoading ? <Loader className='animate-spin mx-auto' size={24}/>: "Verify Email"}
                            </button>
                        </form>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserEmailVerification
