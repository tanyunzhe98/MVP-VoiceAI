import React, { useState } from 'react';

interface MessageListProp {
  messages: Message[];
}

interface Message {
  role: string;
  content: string;
  response: string;
}

function MessageList({messages}:MessageListProp) {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>
          <strong>{message.role}: </strong>
          {message.content}
          {message.response}
        </li>
      ))}
    </ul>
  )
}

export default MessageList;
