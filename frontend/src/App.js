import logo from './logo.svg';
import './App.css';

import Chat from "./Chat.js";




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Chat />
      </header>
    </div>
  );
}

export default App;
