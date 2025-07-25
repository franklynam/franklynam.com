import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

console.log("SMTP_DISPLAY_NAME:", process.env.SMTP_DISPLAY_NAME);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to Frank
    const emailToFrank = {
      from: `${process.env.SMTP_DISPLAY_NAME} <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name} - franklynam.com`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Email to the person who submitted the form
    const confirmationEmail = {
      from: `${process.env.SMTP_DISPLAY_NAME} <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for reaching out - franklynam.com`,
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for getting in touch with me. I've received your message and will get back to you as soon as I can.</p>
        <p>Here's a copy of what you sent:</p>
        <blockquote style="border-left: 4px solid #dc2626; padding-left: 1rem; margin: 1rem 0; color: #666;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
        <p>Best regards,<br>${process.env.SMTP_DISPLAY_NAME}</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(emailToFrank);
    await transporter.sendMail(confirmationEmail);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
