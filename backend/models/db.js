const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)
.then(()=>
{
    console.log("Mongo connection established");
})
.catch((err)=>{
 console.log("error in mongo connection",err);
})
   
