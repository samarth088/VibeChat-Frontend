import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getConversation } from '../services/api';
import Loader from '../components/Loader';

const HomePage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatPartners = async () => {
      try {
        // In a real app, you'd have an endpoint for conversation list
        // For demo, we'll simulate by fetching recent chats
        const demoPartners = ['alice', 'bob', 'charlie'];
        const convos = await Promise.all(
          demoPartners.map(async (partner) => {
            const messages = await getConversation(partner);
            return {
              partner,
              lastMessage: messages[messages.length - 1]?.text || 'No messages yet',
              timestamp: messages[messages.length - 1]?.createdAt || new Date().toISOString()
            };
          })
        );
        setConversations(convos);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchChatPartners();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h1 className="text-2xl font-bold mb-4">Your Conversations</h1>
        
        {conversations.length === 0 ? (
          <p className="text-gray-500">No conversations yet. Start a new chat!</p>
        ) : (
          <div className="space-y-3">
            {conversations.map((convo) => (
              <Link 
                key={convo.partner}
                to={`/chat/${convo.partner}`}
                className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{convo.partner}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(convo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate max-w-xs">{convo.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
