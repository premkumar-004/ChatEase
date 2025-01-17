import React, { useContext, useEffect, useState } from 'react';
import Avatar from './Avatar';
import Logo from './Logo';
import { UserContext } from './UserContext';

const Chat = () => {
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { username } = useContext(UserContext);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');
        setWs(ws);
        ws.addEventListener("message", handleMessage);
    }, []);


    function showOnlinePeople(peopleArray) {
        const people = {};
        peopleArray.forEach(({ userId, username }) => {
            people[userId] = username;
        });
        setOnlinePeople(people);
    }

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
        if ('online' in messageData) {
            showOnlinePeople(messageData.online);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="bg-white w-1/3 ">
                <Logo />
                {username}
                {Object.keys(onlinePeople).map(userId => (
                    <div key={userId} className={"border-b border-gray-200 py-3 pl-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center gap-2 " + (userId === selectedUserId ? 'bg-blue-50' : '')} onClick={() => setSelectedUserId(userId)}>
                        <Avatar username={onlinePeople[userId]} userId={userId} />
                        <span className='text-gray-800'> {onlinePeople[userId]} </span>
                    </div>
                ))}
            </div>

            <div className="bg-blue-100 w-2/3 p-4 flex flex-col">
                <div className="flex-grow">
                    Messages with selected person
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type your message here"
                        className="bg-white border p-2 flex-grow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                    />
                    <button className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;