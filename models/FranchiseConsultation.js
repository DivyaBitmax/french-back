import mongoose from "mongoose";

const franchiseConsultationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    investmentCapacity: {
      type: String,
     
    },
    lastTwoYearsTurnover: {
      type: String,
    
    },
    preferredIndustry: {
      type: String,
      required: true,
    },

    turnoverProofPdf: {
      type: String, // Cloudinary URL
      required: true,
    },
    authorizationPdf: {
      type: String, // Cloudinary URL
      required: true,
    },

    agreeToContact: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "FranchiseConsultation",
  franchiseConsultationSchema
);
