import express from "express";
import uploadPdf from "../middlewares/uploadPdf.js";
import { getAllFranchiseForms, submitFranchiseForm } from "../controllers/franchiseController.js";

const router = express.Router();

router.post(
  "/submit",
  uploadPdf.fields([
    { name: "turnoverProof", maxCount: 1 },
    { name: "authorizationDoc", maxCount: 1 },
  ]),
  submitFranchiseForm
);

/**
 * GET – Admin: all submissions
 */
router.get("/all", getAllFranchiseForms);

export default router;
