import express from "express" 
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js";

// config env
dotenv.config();

//database config
connectDB();

// rest object
const app=express();

//middleware
app.use(express.json())
app.use(morgan("dev"))

//rest api
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to ecommerce app");
});

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})