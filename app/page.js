"use client"
import { Box, Stack, TextField, Button} from "@mui/material";
import Image from "next/image";
import {useState} from 'react'

export default function Home() {
   const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hi! I am a Mental Health Chatbot! How can I assist you today?`
   }])
   const [message, setMessage] = useState('')
   return <Box 
   width="100vw" 
   height="100vh" 
   display="flex"
   flexDirection = "column"
   justifyContent = "center"
   alignItems = "center"  >
    <Stack 
     direction= "column"
     width = "600px"
     height = "700px"
     border = "1px solid black"
     p = {2}
     spacing = {2}
     >
      <Stack 
      direction="column" 
      spacing={2} 
      flexGrow = {1} 
      overflow = "auto" 
      maxHeight = "100%"
      >
        {
          messages.map((message, index) =>(
            <Box 
            key={index} 
            display="flex" 
            justifyContent={
              message.role === 'assistant' ? 'flex-start' : 'flex-end'
            }><Box
            bgcolor={
              message.role === 'assistant'
              ? 'primary.main' 
              : 'secondary.main'
            }
            color="white"
            borderRadius={16}
            p = {3}
            
            >{message.content}</Box></Box>
          ))
        }
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField label = "message"
         fullWidth 
         value = {message}
         onChange={(e) => setMessage(e.target.value)}
         ></TextField>
         <Button variant = "contained">SEND</Button>
      </Stack>
     </Stack>
   </Box>
}
