const express= require('express');
const https= require('https');
const bodyParser=require('body-parser');
const app = express();
const ejs=require('ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var query=req.body.cityName;
  var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID=697fd263d58b77e20507ba3a7cc7ffcb"+"&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
      try{
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        var image_url="https://openweathermap.org/img/wn/"+icon+ "@2x.png"
        res.render("weather.ejs",{City:query,Temp:temp,Description:weatherDescription,url:image_url,Icon:icon})
      }catch(err){
        res.render("error.ejs")
      }
      });
    });
  });
app.listen(3000,function(){
  console.log("Server Up and Running on Port 3000");
})
