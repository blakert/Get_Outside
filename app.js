const express = require("express");
const request = require("request");
const requestPromise = require("request-promise");
const app = express();


app.set("view engine", "ejs");
app.use("/public",express.static( "public"));

//""
//IPlocator key
const ip_key = "";
//zomato API key
const rest_key = "";

app.get("/",(req,res)=>{
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(ip);
    // const ip = "73.109.145.87";
    const loc_url = `http://api.ipstack.com/${ip}?access_key=${ip_key}`;
    request(loc_url,(error,response,body)=>{
      if(!error && response.statusCode == 200){
         //work with body
         const parsedLocData = JSON.parse(body);
         
         res.render("home",{ip:ip, parsedLocData:parsedLocData});
      }
      else{
         res.send("Something went wrong");
      }
   });
});

app.get("/search",(req,res)=>{
    let city = req.query.city.toLowerCase();
    let options = {
        url: `https://developers.zomato.com/api/v2.1/cities?q=${city}`,
        headers: {
            'user-key': rest_key
        }
    }
    //let cityid;
    //let restData;
    // make the first API call to get cityid
    
    function cityCall(){
        return new Promise(function (resolve,reject){
            request(options,(error,response,body)=>{
            if(!error && response.statusCode == 200){
                let city_data = JSON.parse(body);
                //console.log(city_data);
                //let cityid = city_data.location_suggestions[0].id;
                //console.log(cityid);
                resolve(city_data);
            }else{
                reject();
            }
            });
        ;
        }); 
    }
    let restaurant = function restaurantCall(cityid){
        options.url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityid}&entity_type=city`
        return new Promise(function (resolve,reject){
           request(options,(error,response,body)=>{
           if(!error && response.statusCode == 200){
               let restData = JSON.parse(body);
               console.log(options.url);
               resolve(restData); 
           }else{
               reject();
           }
        });
           
        });
        
    }
   
    cityCall().then(function(city_data){
        return restaurant(city_data.location_suggestions[0].id);
    }).then(function(restaurant_data){
        // make a smaller object with just name, address, coordinates to pass in
       // const Rest_Final_Form = JSON.stringify(restaurant_data);
       
        res.render("eats",{restaurant_data: restaurant_data});
    });
    });
    
    
    
    
    
    app.listen(process.env.PORT,process.env.IP,function(){
   console.log("location app started"); 
});
 

    