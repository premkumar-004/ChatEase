import React from 'react'

const Avatar = ({ username, userId }) => {
    const colors = ['bg-green-200', 'bg-red-200', 'bg-blue-200', 'bg-teal-200', 'bg-purple-200', 'bg-yellow-200'];
    const userIdBase10 = parseInt(userId, 16);
    const colorIndex = userIdBase10 % colors.length;
    const color = colors[colorIndex];
    return (
        <div className={'w-8 h-8 rounded-full flex items-center ' + color}>
            <div className='text-center w-full opacity-70'>{username[0].toUpperCase()}</div>
        </div>
    )
}

export default Avatar