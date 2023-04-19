import React, { useState } from 'react';

interface MessageListProp {
  messages: Message[];
}

interface Message {
  role: string;
  content: string;
}

function MessageList({messages}:MessageListProp) {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>
          <strong>{message.role}: </strong>
          {message.content}
        </li>
      ))}
    </ul>
  )
}

export default MessageList;
