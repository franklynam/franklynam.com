import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Validate environment variables
    if (
      !process.env.SMTP_USER ||
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_PASS ||
      !process.env.SMTP_DISPLAY_NAME ||
      !process.env.ADMIN_EMAIL
    ) {
      return NextResponse.json(
        { error: "Email configuration error" },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
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
      subject: `New Contact Form Submission from ${trimmedName} - franklynam.com`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${trimmedMessage.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Email to the person who submitted the form
    const confirmationEmail = {
      from: `${process.env.SMTP_DISPLAY_NAME} <${process.env.SMTP_USER}>`,
      to: trimmedEmail,
      subject: `Thank you for reaching out - franklynam.com`,
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${trimmedName},</p>
        <p>Thank you for getting in touch with me. I've received your message and will get back to you as soon as I can.</p>
        <p>Here's a copy of what you sent:</p>
        <blockquote style="border-left: 4px solid #dc2626; padding-left: 1rem; margin: 1rem 0; color: #666;">
          ${trimmedMessage.replace(/\n/g, "<br>")}
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
    // Handle JSON parsing errors more robustly
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (
      errorMessage.includes("Unexpected token") ||
      errorMessage.includes("JSON")
    ) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  }
}
