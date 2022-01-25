const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path")
const cors=require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const categoryRoute= require("./routes/categories");
const postRoute = require("./routes/posts");

dotenv.config();

// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "/images")));


// Database Coonect
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Database Connected"))
.catch((err)=>console.log(err));

//Storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename : (req,file,cb)=>{
        cb(null,req.body.name)
    }
});

const upload=multer({storage:storage});

app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/posts",postRoute);



// app.use(express.static(path.join(__dirname, "../client/build")));
//  app.get("*", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
//  });


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
