import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const addEmoji = (emoji) => {
    setText(prev => prev + emoji.native);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center relative">
      <button 
        type="button" 
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="mr-2 text-gray-500 hover:text-blue-500"
      >
        😊
      </button>
      
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-0 z-10">
          <Picker onSelect={addEmoji} set="google" />
        </div>
      )}
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-r-full px-4 py-2 hover:bg-blue-600 transition"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
