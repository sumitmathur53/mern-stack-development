const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());


require("./config/database").connect();

// route import and mount

const user = require("./routs/user");
app.use("/api/v1",user);

// activation

app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`)
})
