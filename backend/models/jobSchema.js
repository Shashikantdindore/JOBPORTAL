import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"please Provide Job Title"],
        minLength : [ 3, "Job Title must contain at least 3 character "],
        maxLength:[ 20, "job Title cannot exceed 20 character"]
    },
    description:{
        type : String,
        required : [true , "Please Provide Job Description "],
        minLength : [ 50, "Job Description must contain at least 50 character "],
        maxLength:[ 1000, "job  Description  cannot exceed 1000 character"]

    },
    category:{
        type: String,
        required: [true , " Job Category Required"]

    },
    country:{
        type: String,
        required: [true , " Job Country Required"]
    },
    city:{
        type: String,
        required: [true , " Job City Required"]


    },
    location:{
        type: String,
        required: [true , " please Provide Exact Location!"],
        minLength: [ 20 ," Job Location must contain at lease 20 character"],
    },
    fixedSalary:{
        type: Number,
        minLength: [4 , "Fixed Salary must Contain at least 4 digit"],
        maxLength: [9, "Fixed Salary cannot exceed 9 digit!" ]

    },
    salaryFrom:{
        type: Number,
        minLength: [4 , " Salary from must Contain at least 4 digit"],
        maxLength: [9, " Salary from  cannot exceed 9 digit!" ]
         
    },
    salaryTo:{
        type: Number,
        minLength: [4 , " Salary to must Contain at least 4 digit"],
        maxLength: [9, " Salary to  cannot exceed 9 digit!" ]
         

    },
    expired:{
        type: Boolean,
        default: false,

    },
    jobPostedOn:{
        type : Date,
        default: Date.now,
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref : "User",
        required:true,
    }

});

export const Job = mongoose.model("Job" , jobSchema);