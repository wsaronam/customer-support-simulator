import { useState } from "react";




function Chat() {

    const [input, setInput] = useState("");

    
    const sendMessage = async() => {
        if (!input.trim()) return;

        try {
            const res = await axios.post("http://localhost:5000/api/respond", { message: input });
        }
        catch (err) {
            console.error(err);
        }

        setInput("");
    }


    return (
        <div>
            <h1>Customer Support Simulator</h1>

            <input>
                value={input}
                {/* onChange={(e) => foo(e.target.value)} */}
                placeholder="Type your message..."
            </input>
            <button onClick={sendMessage}>Send</button>
        </div>
    
    );
}

export default Chat;