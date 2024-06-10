
import { application } from "express";
import { catchAsyncError } from "../middlewaers/catchAsyncError.js";
import errorHandler from "../middlewaers/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from 'cloudinary';
import { Job } from "../models/jobSchema.js"


export const employerGetApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "JobSeeker") {
        return next(new errorHandler("Job Seeker Is Not Allowed To Access This Resources", 400))
    }

    const { _id } = req.user;
    const applications = await Application.find({ 'employerID.user': _id })
    res.status(200).json({
        success: true,
        applications
    })



})

export const jobSeekerGetApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new errorHandler("Employer Is Not Allowed To Access This Resources", 400))
    }

    const { _id } = req.user;
    const applications = await Application.find({ 'applicantID.user': _id })
    res.status(200).json({
        success: true,
        applications
    })



})

export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new errorHandler("Employer Is Not Allowed To Access This Resources", 400))
    }

    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new errorHandler("Oops! Application Not Found", 400))
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted SuccessFully"
    })
});

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new errorHandler("Employer Is Not Allowed To Access This Resources", 400));
    }
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new errorHandler("Resume File Required", 400));
    }
    
    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new errorHandler("Invalid File Type! Please Upload PNG, JPG, or WEBP Format", 400));
    }
    
    const cloudeResponse = await cloudinary.uploader.upload(resume.tempFilePath);
    if (!cloudeResponse || cloudeResponse.error) {
        console.error("cloudinary error", cloudeResponse.error || "unknown cloudinary error");
        return next(new errorHandler("Failed to upload Resume", 500));
    }
    
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    if (!name || !email || !coverLetter || !phone || !address) {
        return next(new errorHandler("Please Fill All Fields", 400));
    }
    
    if (!jobId) {
        return next(new errorHandler("Job ID Required", 404));
    }
    
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new errorHandler("Job Not Found", 404));
    }
    
    const applicantID = {
        user: req.user._id,
        role: "JobSeeker"
    };
    
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer"
    };
    
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudeResponse.public_id,
            url: cloudeResponse.secure_url
        }
    });
    
    res.status(200).json({
        success: true,
        message: "Application Submitted",
        application
    });
});
