import React, { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='bg-blue-50 h-screen flex items-center '>
            <form className='w-64 mx-auto mb-12'>
                <input type="text" placeholder='username' className='block w-full rounded-sm p-2 mb-2 border ' value={username} onChange={(event) => {
                    setUsername(event.target.value)
                }} />
                <input type="password" placeholder='password' className='block w-full rounded-sm p-2 mb-2 border ' value={password} onChange={(event) => {
                    setPassword(event.target.value)
                }} />
                <button className='bg-blue-500 text-white block w-full rounded-sm p-2'>Register</button>
            </form>
        </div>
    )
}

export default Register