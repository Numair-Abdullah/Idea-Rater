import express from "express";
import path from "path"
import { table1 } from "./Database/index.js";  // Importing Database table.
import {validPORT} from "./env.js"

import { MLfunction } from "./Utils.js";  // This is a simulation for demonstration purposes.
import { json } from "body-parser";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))  // Middleware for submission of text via post request in jSON format.

app.post('/submit_idea',async(req,res)=>{          // API endpoint for submitting text entered by user.
const ideaText = req.body.idea_description;   // Name of the input field in the frontend has to be "idea_description".
if(ideaText && req.body.author_name){   // Checking if text and name is a valid string.
const user_sentiment = await MLfunction(ideaText);  // Calling function provided by ML Engineer.
let userData = {};
if(user_sentiment != undefined){
userData = {...req.body,user_sentiment,submission_timestamp:new Date()};
try {
    await table1.create(userData);
    res.status(201).json({ message: "Data saved successfully" });
    
} catch (error) {
    res.status(500).json({message : error})    //! Error Handling
    
}
}
else{
    res.status(500).json({message : " Internal Server Error "})
}
}
else{
    res.status(400).json({message : "Bad Request"})
}


})
app.get("*", (req, res) => {
  res.send("404 Page Not Found");  //! Error handling for incorrect URLs
});






app.listen(validPORT,()=>{
    console.log("Server Running at Port :",validPORT);
})
