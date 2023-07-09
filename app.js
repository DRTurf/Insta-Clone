const express=require("express");
const cors=require("cors");
const app=express();
const port=process.env.port || 5000;
const mongoose=require("mongoose");
const { mongoUrl }=require("./keys")
const path=require("path");

app.use(cors());
require("./models/model");
require("./models/post");



app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"))
app.use(require("./routes/user"));

mongoose.connect(mongoUrl);


mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDB");
})


mongoose.connection.on("error",()=>{
    console.log("Error Occured");
})


app.use(express.static(path.join(__dirname,"./frontend/build")))


app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})

app.listen(port,()=>{
    console.log("Server started on localhost:"+port);
})
