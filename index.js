var express=require('express'),
	app=express(),
	bodyParser=require('body-parser'),

app.use(bodyParser())

app.post('/',function(req,res){
	console.log(req.body);
})

app.listen(8080,function(){
	console.log("runnning");
})