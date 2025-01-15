import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const RegisterAndLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
    async function handleSubmit(event) {
        event.preventDefault();
        const url = isLoginOrRegister === 'register' ? '/register' : '/login'
        const { data } = await axios.post(url, { username, password });
        setLoggedInUsername(username);
        setId(data.id);
    }
    return (
        <div className='bg-blue-50 h-screen flex items-center justify-center'>
            <div className='p-6 bg-blue-100 flex item-center rounded-lg justify-between flex-col shadow-black shadow-sm'>
                <form className='w-64 mx-auto mb-3 flex flex-col justify-evenly item-center gap-6' onSubmit={handleSubmit}>
                    <input type="text" placeholder='username' className='block w-full rounded-lg p-2 mb-2 border ' value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                    <input type="password" placeholder='password' className='block w-full rounded-lg p-2 mb-2 border ' value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                    <button className='bg-blue-500 text-white block w-full rounded-lg p-2'>
                        {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                    </button>
                    <div className='text-center'>
                        {
                            isLoginOrRegister === 'register' && (
                                <div>
                                    Already a member?
                                    <button className='text-blue-800 ' onClick={() => setIsLoginOrRegister('login')}>Login</button>
                                </div>

                            )
                        }
                        {
                            isLoginOrRegister === 'login' && (
                                <div>
                                    Dont have an account?
                                    <button className='text-blue-800 ' onClick={() => setIsLoginOrRegister('register')}>Register</button>
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterAndLoginForm