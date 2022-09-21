import express from "express";
import cors from "cors"
import router from "./routes/routes.js";

const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json())
app.use('/', router)

/*
app.get('/', (req,res) => {
    res.send("Hola mundo")
})*/

app.listen(4000, ()=>{
    console.log("server ok")
})

export default app