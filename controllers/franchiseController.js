import FranchiseConsultation from "../models/FranchiseConsultation.js";
import { sendEmail } from "../utils/sendEmail.js";

export const submitFranchiseForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      businessName,
      email,
      phone,
      investmentCapacity,
      lastTwoYearsTurnover,
      preferredIndustry,
      agreeToContact,
    } = req.body;

    if (!req.files?.turnoverProof || !req.files?.authorizationDoc) {
      return res.status(400).json({
        success: false,
        message: "Both PDF documents are required",
      });
    }

    

    const consultation = await FranchiseConsultation.create({
      firstName,
      lastName,
      businessName,
      email,
      phone,
      investmentCapacity,
      lastTwoYearsTurnover,
      preferredIndustry,
      agreeToContact,
      turnoverProofPdf: req.files.turnoverProof[0].path,
      authorizationPdf: req.files.authorizationDoc[0].path,
    });

 
    await sendEmail({
      to: "franchise@bitmaxtest.com", 
      subject: "New Franchise Consultation Lead",
    html: `
  <div style="font-family: Arial, sans-serif; background:#F8FAFC; padding:30px">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden">
      
      <div style="background:linear-gradient(135deg,#1E40AF,#0F172A); padding:20px">
        <h2 style="color:#ffffff; margin:0">📩 New Franchise Consultation Lead</h2>
      </div>

      <div style="padding:25px; color:#111827">
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Business:</b> ${businessName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <hr style="margin:20px 0"/>

        <p><b>Investment Capacity:</b> ${investmentCapacity}</p>
        <p><b>Last 2 Years Turnover:</b> ${lastTwoYearsTurnover}</p>
        <p><b>Preferred Industry:</b> ${preferredIndustry}</p>

        <div style="margin-top:25px">
          <a href="${consultation.turnoverProofPdf}"
             style="display:inline-block; padding:10px 16px; background:#1E40AF; color:#fff; text-decoration:none; border-radius:6px; margin-right:10px">
             📄 Turnover Proof
          </a>

          <a href="${consultation.authorizationPdf}"
             style="display:inline-block; padding:10px 16px; background:#F97316; color:#fff; text-decoration:none; border-radius:6px">
             📄 Authorization Doc
          </a>
        </div>
      </div>

      <div style="background:#F1F5F9; text-align:center; padding:12px; font-size:12px; color:#475569">
        FranchiseHub Pro • New Lead Notification
      </div>
    </div>
  </div>
`

    });

    /* ---------------- EMAIL TO USER ---------------- */
    await sendEmail({
      to: email,
      subject: "Franchise Consultation Received",
     html: `
  <div style="font-family: Arial, sans-serif; background:#F8FAFC; padding:30px">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden">

      <div style="background:linear-gradient(135deg,#1E40AF,#0F172A); padding:20px; text-align:center">
        <h2 style="color:#ffffff; margin:0">FranchiseHub Pro</h2>
        <p style="color:#E5E7EB; margin:5px 0 0">Free Franchise Consultation</p>
      </div>

      <div style="padding:30px; color:#111827">
        <h3>Hello ${firstName} 👋</h3>

        <p>
          Thank you for submitting your <b>Free Franchise Consultation</b> request.
        </p>

        <p>
          Our experts are reviewing your details and will contact you shortly with
          personalized franchise opportunities.
        </p>

        <div style="margin:30px 0; text-align:center">
          <span style="display:inline-block; padding:12px 20px; background:#F97316; color:#ffffff; border-radius:6px; font-weight:bold">
            ✔ Request Received Successfully
          </span>
        </div>

        <p style="font-size:14px; color:#475569">
          If you have any urgent questions, feel free to reply to this email.
        </p>

        <p style="margin-top:30px">
          Regards,<br/>
          <b>FranchiseHub Pro Team</b>
        </p>
      </div>

      <div style="background:#F1F5F9; text-align:center; padding:12px; font-size:12px; color:#475569">
        © ${new Date().getFullYear()} FranchiseHub Pro. All rights reserved.
      </div>
    </div>
  </div>
`

    });

    res.status(201).json({
      success: true,
      message: "Form submitted & email sent successfully",
      data: consultation,
    });
  } catch (err) {
  const errors = Object.values(err.errors).map(e => e.message);
  res.status(400).json({ success: false, errors });
}
};


/*  getallusers */
export const getAllFranchiseForms = async (req, res) => {
  const data = await FranchiseConsultation.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    total: data.length,
    data,
  });
};
