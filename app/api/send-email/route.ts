import { NextRequest, NextResponse } from "next/server";

interface EmailPayload {
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  followUpAnswers?: Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailPayload = await request.json();
    const { name, email, phone, serviceCategory, followUpAnswers } = body;

    if (!name || !email || !phone || !serviceCategory) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "info@mapxlogistics.com";
    
    const emailSubject = `New Strategy Call Booking: ${name}`;
    
    let emailBody = `
New strategy call booking received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service Category: ${serviceCategory}
`;

    if (followUpAnswers && Object.keys(followUpAnswers).length > 0) {
      emailBody += "\nAdditional Information:\n";
      Object.entries(followUpAnswers).forEach(([key, value]) => {
        emailBody += `${key}: ${value}\n`;
      });
    }

    emailBody += `\n---\nThis email was sent from the MapxLogistics contact form.`;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import("nodemailer");
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"MapxLogistics Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: email,
        subject: emailSubject,
        text: emailBody,
      });

      return NextResponse.json({ success: true });
    } else {
      console.log("Email would be sent to:", recipientEmail);
      console.log("Subject:", emailSubject);
      console.log("Body:", emailBody);
      
      return NextResponse.json(
        { 
          success: true, 
          message: "Email configuration not set. Check logs for email content.",
          debug: {
            recipientEmail,
            emailSubject,
            emailBody,
          }
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
