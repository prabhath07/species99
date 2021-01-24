const express = require('express');
const app = express();
const {mongoURI} = require('./config/keys');
const bcrypt = require('bcryptjs');
const PORT  = process.env.PORT||5000



const mongoose = require('mongoose');
mongoose.connect(mongoURI,{  useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true});
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));


const middleware =(req,res,next)=>{
    next();
}
app.use(middleware);

app.get('/',(req,res)=>{
    console.log('hello !!!!!')
})

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{console.log('heloooo')});
// "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client",