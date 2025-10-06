"use client";

import { useEffect, useRef } from "react";
import { format } from 'date-fns'

interface MessagesProps {
  messages: { id: number; text: string; senderId: number, date: Date }[];
  realUserId: number;
}

export default function Messages({ messages, realUserId }: MessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-5 text-xs md:text-sm max-w-full break-words h-[400px] overflow-y-auto">
      {messages.length === 0 && (
        <div className="flex justify-center mt-40 text-neutral-500">
          No messages
        </div>
      )}
      <div>
        {messages.map((message) => (
          <div
            className={`flex mb-4 ${
              message.senderId === realUserId ? "justify-end" : "justify-start"
            }`}
            key={message.id}
          >
            <div
              className={`relative px-4 py-4 rounded-lg break-words max-w-full sm:max-w-xs flex-shrink-0 ${
                message.senderId === realUserId
                  ? "bg-blue-400 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <p className="md:text-sm text-xs">{message.text}</p>
              {message.senderId === realUserId ? (
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-blue-400"></div>
              ) : (
                <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-300"></div>
              )}
              <p className="text-neutral-700 text-xs mt-2 text-end">{format(new Date(message.date), "MMM d, yyyy, hh:mm a")}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}
