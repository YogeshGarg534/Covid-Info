const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fetch = require('node-fetch');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

let Country = [];
let Cases = [];

app.get("/",function(req,res){

    const url1 = "https://corona.lmao.ninja/v2/countries#"

   fetch(url1)
   .then(res=> res.json())
   .then(function(data){

    const covidInfo = data;
    for(i=0;i<222;i++){
         
        Country.push(covidInfo[i].country);
        Cases.push(covidInfo[i].active);
        }
   });
  
       res.render("home",{Country:Country,Cases:Cases})  
})

app.get('/:countryName',function(req,res){
    

    const url2 = "https://corona.lmao.ninja/v2/countries/" + req.params.countryName
   
    fetch(url2)
    .then(res=> res.json())
    .then(function(Data){
    const name = Data.country;
    const totalCase = Data.cases;
    const todayCase = Data.todayCases;
    const totalDeath = Data.deaths;
    const todayDeath = Data.todayDeaths;
    const totalRecovered = Data.recovered;
    const todayRecovered = Data.todayRecovered;
    
    console.log(name);

    res.render("info",{name:name,totalCase:totalCase,todayCase:todayCase,totalDeath:totalDeath,todayDeath:todayDeath,totalRecovered:totalRecovered, todayRecovered:todayRecovered});

    }); 

    

})

    



app.listen(3000, function() {
    console.log("sever is running on port 3000");
});