import mongoose from "mongoose";


 export const dbconnection =() =>{
    mongoose.connect(process.env.MONGO_URI , {
        dbName : "JOB_PORTAL"

    }).then(() =>{
        console.log('connected to database!')
    }).catch((err)=>{
        console.log(`failed to coonect: ${err} `)

    })
}