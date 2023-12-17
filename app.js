const fs=require("fs")
const path=require("path")
const express=require("express")
const app=express()
const mongoose = require('mongoose');
const bodyparser=require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phont:String,
    email:String,
    address:String,
    desc:String,
  });

  const Contact = mongoose.model('Contact', contactSchema);

const port=7000
app.use("/static",express.static('static'))
app.set("view engine","pug")
app.set("views", path.join(__dirname,'views'))

app.get("/",(req,res)=>{
    const params={"title":"fuck","content":"suck"}
    res.status(200).render("home.pug",params)
})
app.get("/contact",(req,res)=>{
    const params={"title":"fuck","content":"suck"}
    res.status(200).render("contact.pug",params)
})
// app.post("/contact",(req,res)=>{
//     const params={"title":"fuck","content":"suck"}
//     res.status(200).render("contact.pug")
// })
app.post("/contact",(req,res)=>{
    var myData=new Contact(req.body)
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })
    // res.status(200).render("home.pug")
})

app.listen(port,()=>{
    console.log("app running at ")
})