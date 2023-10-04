import { Server } from "socket.io";
import express from 'express';
import  http from 'http';
import cors from 'cors';


const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors :{
        origin : "http://localhost:3001",
        methods : ["GET","POST"],
    },
})

app.get('/', (req, res) => {
  res.send('<h1>Backend Working</h1>');
});

io.on("connection", (socket) =>{
    console.log(`User Connected : ${socket.id}`)

    socket.on('join_room',(data) =>{
        socket.join(data);
    })

    socket.on("send_message",(data) =>{
        console.log(data);
        socket.to(data.room).emit("receive_message",data);
    })
})


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});