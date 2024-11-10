const express = require("express")
const app  = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDb = require("./config/dbConnection");
const contactRoute = require("./routes/contactRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const { connect } = require("mongoose");
const userRoute = require("./routes/userRoutes")

connectDb()
app.use(express.json())
app.use(errorHandler)
app.use("/api/contacts",contactRoute)
app.use("/api/users",userRoute)


app.listen(port , () =>{
    console.log(`Server is running on port ${port}`)
})