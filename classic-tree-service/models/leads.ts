import mongoose, { Schema, models, model } from "mongoose";
import { required } from "zod/mini";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, trim: true, maxlength: 2000 },
    imageUrls: [{ type: String }],
    jobType: {type: String, required: true, trim: true},
    userAgent: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model("Lead", LeadSchema);
