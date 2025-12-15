//this must be the firsst line of code it 
//is we configuringing hte donenv file like we 
// use for db connection
require('dotenv').config();


// 1. Import the express library

const express = require('express');


// import the mongoose library
const mongoose=require('mongoose');

//connectin wiht the frontend so we need cors impor it 
const cors=require("cors"); 

/
// 2. Create an instance of an express application
const app = express();

// 3. Define the port our server will run on
const PORT = 3000;

app.use(core()); 

//this is middleware that tells Express to automatically parse JSON  from request body
app.use(express.json());


//new--this is our memory database its a simple js object

//the key will be the shorcode and the value will be th lonurl
// const urlDatabase={};

//rgt now connect orginal db

                 //--- database connection---
//process .env.MONGO_URL is how we acces the secret string from our
//.env file
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("MongoDB connected successfully m!m")})
.catch((err)=>{
    console.error("MongoDB connection errror",err);
});

             //----mongoose schema and model---
//this is the bulprint for our data
const urlSchema=new mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },shortCode:{
        type:String,
        required:true,
        unique:true// to ensure no two documnet can have the same shortCode
    },clickCount:{
        type:Number,
        default:0
    }
});


//this is the tool we'll use to interact with the 'urls' collection
                   //this is model
const Url=mongoose.model('Url',urlSchema);






//new---a simole function to generate a random string of 6 characters
function generateShortCode(){
    return Math.random().toString(36).substring(2,8);
}





//updated logic for the routes
//---our API routes will go here---

//route 1:Handle POST requests to create a short url
//Label:"submit a new long url here"
// app.post('/api/url',(req,res)=>{console.log("Here is the data we received:",req.body);
//     res.json({message:"okay ,we received your URL we will create a short one soon!",
//         url:req.body.longUrl
//     });

// });

//----old routes----
// app.post('/api/url',(req,res)=>{
//     //get the longUrl from the request body
//     const longUrl=req.body.longUrl;

//     if(!longUrl){
//         //if the  user didn't provide a logurl,send an erro response
//         return res.status(400).json({error:"longUrl is required"})

//     }

    //generate a new short code
//     const shortCode=generateShortCode();

//     //save the pair in our database
//     urlDatabase[shortCode]=longUrl;

//     console.log("Updated Database:",urlDatabase);

//     //send back a succes response with the new short url
//     res.status(201).json({shortCode:`http://localhost:${PORT}/${shortCode}`});
// });



//updaed --- redirected to the orginal url
//route 2:handle GET request to redirect to orginal URL
//the "shortcode part is a "url parmraeter" its aplaceholder
// express will capture whatever is put there and save it in req.params.shortCode
// app.get('/shortCode',(req,res)=>{const shortCode=req.params.shortCode;
//     res.send(`okay i will soon redirect you the link for the code: ${shortCode}`);
// });


//----old route for the get shortcode----
// app.get('/:shortCode',(req,res)=>{
//     //get the shortcode from the url parameters
//     const shortCode=req.params.shortCode;

//     //find the corresponding longurl in our database
//     const longUrl=urlDatabase[shortCode];

//     if(longUrl){
//         //if we found it.redirect the user
//         console.log(`Redirecting ${shortCode} to ${longUrl}`);
//         res.redirect(longUrl);
//     }else{
//         //if we didn't find a url for that code, send a 404 not found error 
//         res.status(404).json({error:"URL not found"});
//     }
// });


// //----our api route(we will update them too)---
// app.get('/api/url',(req,res)=>{
//     res.json({message:"Will create short url in the database soon ..."});
// });

// app.post('/:shortCode',(req,res)=>{res.json({message:"Will redirect from the database soon..."});
// });

// //extra get method from me
// app.get('/health',(req,res)=>{console.log("got it the api is working fine got the get api");
//     res.json({status:"API is healthy and running",db:mongoose.connection.readyState==1?"connected":"disconnected"});
// });

                     //updated final loutes with logic//
                     
   app.get('/health',(req,res) => {
    res.json({status:"API is healty",  db:mongoose.connect.readyState==1?"connected":"disconnected"});

   }) ;  
   
   //route to create a new short url
   //we add  async to tell javascript  this function contains 'await' operations
   app.post('/api/url',async(req,res)=>{
    try{
        const{longUrl}=req.body;
        if(!longUrl){
            return res.status(400).json({error:"lonurl is required"});

        }

        //this implementation the collision-proof logic we designed!
        let shortCode;
        let isUnique=false;
        while(!isUnique){
            shortCode=generateShortCode();
            //'await' pause the function untill the database responds
           const existing= await Url.findOne({shortCode:shortCode});
           if(existing===null){
            isUnique=true;
           }
        }
        //create a new url document using our model
        const newUrl=new Url({
            longUrl:longUrl,
            shortCode:shortCode,
        });

        //save it to the database
        await newUrl.save();
        res.status(201).json({
<<<<<<< HEAD
            shortUrl:`https://r-url-shortener-api.onrender.com/${shortCode}`
=======
            shortUrl:`https://r-url-shortener-api.onrender.com:${PORT}/${shortCode}`
>>>>>>> 67a3c2f (changed the locahost to the render url)
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Server error"});
    }

   });

   //new route from home work  to get stats for a short url
   app.get('/api/stats/:shortCode',async(req,res)=>{
    try{
        //get the shortcode from the url parameters
        const shortCode=req.params.shortCode;
        //find the document in the database using the shortcode
        //we just use .findOne() bcz we're only reading,not changing
        const urlDoc=await Url.findOne({shortCode:shortCode});

        //check if we found anything
        if(urlDoc){
            //if yes send back the data as json
            res.json({
                longUrl:urlDoc.longUrl,
                clickCount:urlDoc.clickCount
            });
        }else{
            //if no send a 4040 error
            res.status(404).json({error:"URL not found"});
        }
    }
    catch(error){
        //if the database fails,send a 500 error
        console.error(error);
        res.status(500).json({error:"Server error"});
    }
   });

   //route to handle the redirect and update the click count
   app.get('/:shortCode',async(req,res)=>{
    try{
        const shortCode=req.params.shortCode;
        //find the document and increment its clickcount in one atomic operation
        const urlDoc=await Url.findOneAndUpdate(
            {
                shortCode:shortCode
            },
            {
                $inc:{clickCount:1}
            }
        );
        
        if(urlDoc){
            //if we found a document, redirect the user
            res.redirect(urlDoc.longUrl);

        }else{
            //if not, send a 404
            res.status(404).json({error:"URL not found"});
        }


    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"SErver error"});
    }
   });


// 4. Define a simple API route
// This tells the server: "If someone makes a GET request to the main URL ('/'),
// send back a response with the text 'Hello, World!'".
app.get('/', (req, res) => {
  res.send('My first API is working fine!');
});

// 5. Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
