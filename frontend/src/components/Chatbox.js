import { useState, useRef, useEffect } from "react";
import axios from "axios";

import "./styles/Chatbox.css";




function Chatbox() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);

    // auto scrolls the chatbox to the bottom when the messages update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = async() => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);

        try {
            const res = await axios.post("http://localhost:5000/api/respond", { message: input });
            setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
        }
        catch (err) {
            console.error(err);
        }

        setInput("");
        
        // resets the textarea size after a message is sent
        const textarea = document.querySelector(".chat-input");
        if (textarea) {
            textarea.style.height = "40px";
        }
    }


    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.role}`}>
                        <b>{msg.role}:</b> {msg.content}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="input-container">
                <textarea
                    className="chat-input"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    placeholder="Type your message..."
                />
                <button className="chat-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chatbox;