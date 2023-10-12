import React, { useEffect, useState } from "react";
import './App.css';
import io from 'socket.io-client';

function App() {
  const [connection, setConnection] = useState("Connecting...");
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState(null);
  
  const socket = io("http://localhost:4000");
  const addMe =()=>{
      if (connection=="Connection Successfully Established"){
        socket.emit("joinRoom", username);

        socket.on("updateUsers", (userList) => {
          setUsers(userList);
        });
    
      }
  }
  console.log(socket)
  useEffect(() => {

    socket.on("connect", () => {
      setConnection("Connection Successfully Established");
    });

    socket.on("disconnect", () => {
      setConnection("Connection Closed");
      
    });

    return () => {
      console.log("Disconnected")
      socket.disconnect();

    };
  }, []);

  return (
    <div className="App">
      <h1>This is the app</h1>
      <div>{connection}</div>
      <input placeholder='Enter username' onChange={e => setUserName(e.target.value)}/>
      <button onClick={addMe}>Join</button>
      <h2>Connected Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
