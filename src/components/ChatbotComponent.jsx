import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import * as marked from 'marked'; // Importing the entire module
import './ChatbotComponent.css';

const ChatbotComponent = () => {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        try {
            const response = await fetch('http://127.0.0.1:8001/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: input }),
            });
            const data = await response.json();
            if (response.ok) {
                setConversation([
                    ...conversation,
                    { msg: input, from: 'You' },
                    { msg: data.response, from: 'Bot' },
                ]);
            } else {
                setConversation([
                    ...conversation,
                    { msg: input, from: 'You' },
                    { msg: 'Error in response from server', from: 'Bot' },
                ]);
            }
            setInput('');
        } catch (error) {
            console.error("Failed to send message:", error);
            setConversation([
                ...conversation,
                { msg: input, from: 'You' },
                { msg: 'Failed to connect to the server.', from: 'Bot' },
            ]);
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="chatbot-container">
            <div className={`chat-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
                <span>{isOpen ? '✕' : '💬'}</span>
            </div>
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">AI Assistant</div>
                    <div className="messages">
                        {conversation.map((entry, index) => (
                            <div
                                key={index}
                                className={`message ${entry.from === 'You' ? 'user' : 'bot'}`}
                            >
                                <FontAwesomeIcon
                                    icon={entry.from === 'You' ? faUser : faRobot}
                                    className="icon"
                                />
                                <span
                                    className="message-text"
                                    dangerouslySetInnerHTML={{
                                        __html: marked.marked(entry.msg), // Correct usage
                                    }}
                                ></span>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-container">
                        <input
                            className="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage} className="send-button">
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotComponent;
