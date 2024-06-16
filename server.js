import express from "express" 
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
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

//routes
app.use("/api/auth",authRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/product",productRoutes)

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})