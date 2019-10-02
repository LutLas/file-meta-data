var express = require("express");
var multer = require("multer");
var upload = multer({dest:'uploads/'});
var fs = require("fs");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
app.set('views','./public');
app.set('view engine','pug');
app.get('/',function(req,res){
    res.render('home');
});
app.post('/upload',upload.single('uploadFile'),function(req,res){
    // res.render('home',{fileSize: req.file.size});
    fs.unlink(req.file.path,function(err){
        if(err){
            return console.log(err);
        } else {
            console.log(req.file.filename+' is deleted');
        }
    });
    res.json({fileSize: req.file.size})
});
app.use('/css',express.static(path.join(__dirname,'public/css')));
app.use('/js',express.static(path.join(__dirname,'public/js')));
app.get('*',function(req,res){
    res.json(req.headers);
});
app.listen(port);