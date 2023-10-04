import './App.css';
import io from 'socket.io-client'
import { useEffect,useState } from 'react';

const socket = io.connect("http://localhost:3000")

function App() {

  const [room,setRoom] = useState("");
  const [message,setMessage] = useState('');
  const [messageReceived,setMessageReceived] = useState('');

  const joinroom = () =>{
    if (room !==''){
      socket.emit('join_room',room);
    }
  };
  const sendMessage = () =>{
    socket.emit("send_message",{message});
  };

  useEffect(()=>{
    socket.on('receive_message',(data) =>{
      setMessageReceived(data.message)
    })
  },[socket])

  return (
    <div className="App">
      <input placeholder='Enter Room Here' onChange={(event)=>{setRoom(event.target.value);}}/>
      <input placeholder='Enter Message Here' onChange={(event)=>{setMessage(event.target.value);}}/>
      <button onClick={sendMessage} >Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
