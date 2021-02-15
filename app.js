const express= require("express");
const app= express();
const port= 800;
const path= require("path");
const bp= require("body-parser");
const mongoose =require("mongoose");
mongoose.connect('mongodb://localhost/Hell',{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.once('open',function(){
    console.log("Sucessfull Connection");
})
var SchMaking = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    age:String,
    country:String,
    txt:String,

});
var modell= mongoose.model('collect',SchMaking);
app.use(express.urlencoded());
app.use('/static',express.static('static'));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.get('/home',(req,res)=>res.status(200).render('first'));
app.get('/award',(req,res)=>res.status(200).render('award'));
app.get('/news',(req,res)=>res.status(200).render('news'));
app.get('/contact',(req,res)=>res.status(200).render('contact'));
app.post('/contact',(req,res)=>
{
     var MyData= new modell(req.body);
     MyData.save(function(err,fluffy){
         if(err) return console.error(err);
     });
    res.status(200).render('contact')});
    modell.find(function(err,fluffy){
        if(err) return console.error(err);
         console.log(fluffy);
    })
app.listen(port,()=>console.log("listening"));
