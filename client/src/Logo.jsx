import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center p-4">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <img
                    src="chat-icon.png"
                    alt="ChatEase"
                    className="w-6 h-6 object-contain"
                />
                <span className="text-blue-600 font-bold text-lg">
                    ChatEase
                </span>
            </div>
        </div>
    )
}

export default Logo