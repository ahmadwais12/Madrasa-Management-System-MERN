import React, { useState } from "react";
import Card from "../../components/UIHelper/Card";
import Avatar from "../../components/UIHelper/Avatar";
import Button from "../../components/UIHelper/Button";
import Input from "../../components/UIHelper/Input";
import Search from "../../components/UIHelper/Search";
import Badge from "../../components/UIHelper/Badge";

const contacts = [
  { id: 1, name: "Admin Office", unread: 2 },
  { id: 2, name: "Teacher Ahmad", unread: 0 },
  { id: 3, name: "Finance Department", unread: 5 },
];

const initialMessages = [
  { sender: "Admin Office", text: "Please check complaint CMP-001.", time: "10:20 AM" },
  { sender: "You", text: "I will review it today.", time: "10:25 AM" },
  { sender: "Admin Office", text: "Thank you.", time: "10:27 AM" },
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage) return;
    setMessages([...messages, { sender: "You", text: newMessage, time: "Now" }]);
    setNewMessage("");
  };

  return (
    <div className="p-6">
      <Card>
        <div className="flex h-[600px]">

          {/* Contacts */}
          <div className="w-1/3 border-r p-4 space-y-4">
            <Search placeholder="Search contacts..." />
            {contacts.map((contact) => (
              <div key={contact.id} className="flex justify-between items-center p-3 hover:bg-gray-100 rounded cursor-pointer">
                <div className="flex items-center gap-2">
                  <Avatar name={contact.name} />
                  {contact.name}
                </div>
                {contact.unread > 0 && (
                  <Badge type="danger">{contact.unread}</Badge>
                )}
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col justify-between p-4">

            <div className="space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-md p-3 rounded-lg ${
                    msg.sender === "You"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-70">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>

          </div>

        </div>
      </Card>
    </div>
  );
};

export default Messages;