const express = require("express");
const port =3000;

const app = express();
app.use(express.static('public'));
app.use(express.json());



app.listen(port,()=>{
    console.log("server is started!");
});