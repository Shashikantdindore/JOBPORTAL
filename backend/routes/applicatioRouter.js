import { isAuthorized} from "../middlewaers/auth.js";
 
import {employerGetApplications , jobSeekerDeleteApplication , jobSeekerGetApplications, postApplication} from "../controllers/applicationController.js"
import express from "express";

const router = express.Router();

router.post("/jobseeker/post" , isAuthorized , postApplication)

router.get("/jobseeker/getall",isAuthorized, jobSeekerGetApplications)

router.get("/employer/getall",isAuthorized, employerGetApplications)

router.delete("/deleteApplication/:id" , isAuthorized ,jobSeekerDeleteApplication)


export default router;
