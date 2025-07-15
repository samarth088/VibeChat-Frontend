import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getConversation, sendMessage } from '../services/api';
import MessageCard from '../components/MessageCard';
import ChatInput from '../components/ChatInput';
import Loader from '../components/Loader';

const ChatPage = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) navigate('/login');
    
    const fetchMessages = async () => {
      try {
        const data = await getConversation(username);
        setMessages(data);
      } catch (err) {
        setError('Failed to load conversation');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, [username, user, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    try {
      const newMessage = await sendMessage(username, text);
      setMessages([...messages, newMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-4 mb-4 sticky top-0 z-10">
        <h2 className="text-xl font-bold flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="mr-2 text-blue-500 hover:text-blue-700"
          >
            &larr;
          </button>
          Chat with {username}
        </h2>
      </div>
      
      <div className="flex-grow overflow-y-auto bg-white rounded-lg shadow p-4 mb-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <MessageCard 
              key={msg._id || msg.createdAt}
              message={msg}
              isOwn={msg.from === user?.username}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
