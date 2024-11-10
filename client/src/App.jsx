import React, { useEffect,useState,useMemo } from 'react'
import {io} from 'socket.io-client'
import {Container,Typography,TextField,Button} from '@mui/material'
function App() {
  const socket=useMemo(() => io("http://localhost:3000"),[]);

  const [messages,setMessages]=useState([]);
  const [message,setMessage]=useState("");
  const [room,setRoom]=useState("");
  const [socketId,setSocketId]=useState("");
  
  console.log(messages);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage("");
  }

  useEffect(()=>{

    socket.on("connect",()=>{
      setSocketId(socket.id);
      console.log("connected",socket.id);
    })
    
    socket.on("receive-message",(data)=>{
      console.log(data);
      setMessages((messages)=>[...messages,data])
    })

    socket.on("welcome",(s)=>{
      console.log(s);
    })

    return()=>{
      socket.disconnect();
    }
  },[]);
  return (
    <Container maxWidth="sm">
     <Typography varient="h2" component="div" gutterBottom>
        {socketId}
     </Typography>
     <form onSubmit={handleSubmit}>
      <TextField 
       value={message} 
       onChange={(e)=>setMessage(e.target.value)}
       id="outlined-basic" 
       label="Message" 
       variant="outlined"
       />
       <TextField 
       value={room} 
       onChange={(e)=>setRoom(e.target.value)}
       id="outlined-basic" 
       label="Room" 
       variant="outlined"
       />
       <Button type="submit" variant="contained" color="primary">Send</Button>
     </form>
    </Container>
  )
};

export default App