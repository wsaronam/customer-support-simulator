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
    }


    return (
        <div>
            <div className="chat-box">
                {messages.map((msg, i) => (
                    <div 
                        key={i}>
                        <b>{msg.role}:</b> {msg.content}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chatbox;