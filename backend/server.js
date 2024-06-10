import app from "./app.js";

import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDENARY_NAME,
    api_key : process.env.CLOUDENARY_API,
    api_secret : process.env.CLOUDENARY_SECRET,


})

app.listen(process.env.PORT, () =>{
    console.log(`server running on port ${process.env.PORT}`);

});