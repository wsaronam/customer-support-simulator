import { useState } from "react";
import axios from "axios";




function Chat() {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    
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
            <h1>Customer Support Simulator</h1>

            <div>
                {messages.map((msg, i) => (
                    <p key={i}><b>{msg.role}:</b> {msg.content}</p>
                ))}
            </div>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    
    );
}

export default Chat;