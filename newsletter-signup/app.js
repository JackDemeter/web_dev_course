const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const first = req.body.fname;
    const last = req.body.lname;
    const email = req.body.email;

    const data ={
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: first,
            LNAME: last
        }
        
        }],
    }

    const jsonData = JSON.stringify(data);

    const options = {
        method: 'POST',
        auth: "name:1b8b84f66387f2f20d93e2a998fc80e7-us18"
    }
    const URL = "https://us18.api.mailchimp.com/3.0/lists/e09b702177";
    
    const request = https.request(URL, options, function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();
    


    // API Key
    // 1b8b84f66387f2f20d93e2a998fc80e7-us18

    // List
    // 

});


app.listen(3000, function(){
    console.log("server is running on port 3000");
});