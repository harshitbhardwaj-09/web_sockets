import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';

const port=3000;

const app = express();
const server=createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    },
});

app.get('/',(req,res)=>{
    res.send("Hello World");
})

io.on('connection',(socket)=>{
    console.log("user connected");
    console.log("Id",socket.id);

    socket.on("message",(data)=>{
        console.log(data);
        io.to(data.room).emit("receive-message",data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })
})



server.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})