import { catchAsyncError } from "../middlewaers/catchAsyncError.js";
import errorHandler from "../middlewaers/error.js"
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        succsess: true,
        jobs,
    });

});


export const postJob = catchAsyncError(async (req, res, next) => {

    const { role } = req.user;
    if (role === "JobSeeker") {
        return next(new errorHandler("Job Seeker Is Not Allowed To Access This Resources", 400))
    }

    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new errorHandler("Please provide full job details", 400));

    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new errorHandler("Please Provide Fixed Salary OR ranged salary"));
    }

    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new errorHandler("cannot Entered Fixed and Range salary Together"));

    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy

    })

    res.status(200).json({
        success: true,
        message: "JobPosted SuccessFully!",
        job
    })


});


export const getMyJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;

    if (role === "JobSeeker") {
        return next(new errorHandler("Job Seeker Is Not Allowed To Access This Resources", 400))
    }

    const myJobs = await Job.find({postedBy: req.user._id});
    res.status(200).json({
        success:true,
        myJobs,
    });


});

export const updateJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if (role === "JobSeeker") {
        return next(new errorHandler("Job Seeker Is Not Allowed To Access This Resources", 400))
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new errorHandler("Oops! Job Not Found ", 400))
    }
    job = await Job.findByIdAndUpdate(id , req.body, {
        new :true,
        runValidators :  true,
        useFindAndModify: false
        
    })

    res.status(200).json({
        success : true,
        job,
        message:"Job Updated SuccessFully"
    })
});

export const deleteJob = catchAsyncError(async(req , res , next)=>{
    const {role} = req.user;
    if (role === "JobSeeker") {
        return next(new errorHandler("Job Seeker Is Not Allowed To Access This Resources", 400))
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new errorHandler("Oops! Job Not Found ", 400))
    }
    await job.deleteOne();  
    res.status(200).json({
        success:true,
        message :" Job Deleted SuccessFully"
    })

})

export const getSingleJob = catchAsyncError(async(req ,res , next) =>{
    const { id } = req.params;

    try {
            const job = await Job.findById(id);
            if(!job){
                return next(new errorHandler("job Not Found" , 404));
            }
            res.status(200).json({

                success: true,
                job
            })
        
    } catch (error) {
        return next(new errorHandler("Invalid ID/ Cast Error ", 400))
        
    }
    
})