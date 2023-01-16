const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT=3000;
let profile_url = "https://api.github.com/users/"
const token = process.env.TOKEN;


const bodyparser = require("body-parser");


const headers = {
   "Authorization":`Token ${token}`
}


app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
   res.send("Hello Express is running Here")
   
})
app.post('/getProfile',async(req,res)=>{
   let rep_name = req.body.name
   let prof = profile_url+rep_name
   let rep = prof+"/repos"
     
   fetch(prof,{"method":"GET","headers":headers}).then((result)=>result.json())
   .then((data)=>{
      res.send(data);
   })
})
app.post('/getRepo',async(req,res)=>{

   let name = req.body.name
   let prof  = profile_url+name
   let rep = prof+"/repos?per_page=200"
   fetch(rep,{"method":"GET","headers":headers}).then((result)=>result.json())
   .then((data)=>{
      res.send(data);
   })
  
})

app.listen(PORT,()=>console.log(`Server started on port ${PORT}...`))

