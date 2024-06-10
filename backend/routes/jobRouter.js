import express from "express";
import {deleteJob, getAllJobs, getMyJob, getSingleJob, postJob, updateJob} from "../controllers/jobController.js";
import {isAuthorized} from "../middlewaers/auth.js"

const router = express.Router();

router.get("/getAllJobs" ,  getAllJobs);
router.post("/postJob" , isAuthorized , postJob)
router.get("/myJob" , isAuthorized, getMyJob);
router.put("/updateMyJob/:id" , isAuthorized , updateJob);
router.delete("/deleteMyJob/:id" , isAuthorized , deleteJob);
router.get("/:id" , isAuthorized , getSingleJob);


export default router;
  