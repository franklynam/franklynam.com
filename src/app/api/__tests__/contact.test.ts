/**
 * @jest-environment node
 */
/* eslint-disable @typescript-eslint/no-require-imports */

import { NextRequest } from "next/server";
import { POST } from "../contact/route";

// Mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

// Mock environment variables
const originalEnv = {
  SMTP_USER: "test@example.com",
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "587",
  SMTP_PASS: "password123",
  SMTP_DISPLAY_NAME: "Test User",
  ADMIN_EMAIL: "admin@example.com",
  NODE_ENV: "test" as const,
};

describe("/api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("POST method", () => {
    it("should return 400 for missing required fields", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "",
          email: "",
          message: "",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Missing required fields");
    });

    it("should return 400 for invalid email format", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
          email: "invalid-email",
          message: "Test message",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid email format");
    });

    it("should return 400 for message too short", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "Short",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Message must be at least 10 characters");
    });

    it("should return 400 for name too short", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "J",
          email: "john@example.com",
          message: "This is a valid message with enough characters",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Name must be at least 2 characters");
    });

    it("should return 500 when environment variables are missing", async () => {
      // Clear environment variables
      delete process.env.SMTP_USER;
      delete process.env.SMTP_HOST;
      delete process.env.SMTP_PORT;
      delete process.env.SMTP_PASS;
      delete process.env.SMTP_DISPLAY_NAME;
      delete process.env.ADMIN_EMAIL;

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "This is a valid message with enough characters",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Email configuration error");
    });

    it("should return 500 when email sending fails", async () => {
      const nodemailer = require("nodemailer");
      const mockSendMail = jest.fn().mockRejectedValue(new Error("SMTP error"));
      nodemailer.createTransport.mockReturnValue({
        sendMail: mockSendMail,
      });

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "This is a valid message with enough characters",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to send email");
    });

    it("should return 200 and send email successfully", async () => {
      const nodemailer = require("nodemailer");
      const mockSendMail = jest
        .fn()
        .mockResolvedValue({ messageId: "test-id" });
      nodemailer.createTransport.mockReturnValue({
        sendMail: mockSendMail,
      });

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "This is a valid message with enough characters",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Email sent successfully");

      // Verify emails were sent with correct data
      expect(mockSendMail).toHaveBeenCalledTimes(2);

      // First call: Email to admin
      expect(mockSendMail).toHaveBeenNthCalledWith(1, {
        from: "Test User <test@example.com>",
        to: "admin@example.com",
        subject: "New Contact Form Submission from John Doe - franklynam.com",
        html: expect.stringContaining("John Doe"),
      });

      // Second call: Confirmation email to user
      expect(mockSendMail).toHaveBeenNthCalledWith(2, {
        from: "Test User <test@example.com>",
        to: "john@example.com",
        subject: "Thank you for reaching out - franklynam.com",
        html: expect.stringContaining("John Doe"),
      });
    });

    it("should handle malformed JSON", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: "invalid json",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid JSON");
    });

    it("should sanitize input data", async () => {
      const nodemailer = require("nodemailer");
      const mockSendMail = jest
        .fn()
        .mockResolvedValue({ messageId: "test-id" });
      nodemailer.createTransport.mockReturnValue({
        sendMail: mockSendMail,
      });

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "  John Doe  ", // Extra whitespace
          email: "  john@example.com  ", // Extra whitespace
          message: "  This is a valid message with enough characters  ", // Extra whitespace
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Email sent successfully");

      // Verify emails were sent with trimmed data
      expect(mockSendMail).toHaveBeenCalledTimes(2);

      // First call: Email to admin
      expect(mockSendMail).toHaveBeenNthCalledWith(1, {
        from: "Test User <test@example.com>",
        to: "admin@example.com",
        subject: "New Contact Form Submission from John Doe - franklynam.com",
        html: expect.stringContaining("John Doe"),
      });

      // Second call: Confirmation email to user
      expect(mockSendMail).toHaveBeenNthCalledWith(2, {
        from: "Test User <test@example.com>",
        to: "john@example.com",
        subject: "Thank you for reaching out - franklynam.com",
        html: expect.stringContaining("John Doe"),
      });
    });

    it("should handle special characters in input", async () => {
      const nodemailer = require("nodemailer");
      const mockSendMail = jest
        .fn()
        .mockResolvedValue({ messageId: "test-id" });
      nodemailer.createTransport.mockReturnValue({
        sendMail: mockSendMail,
      });

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: 'John "The Boss" Doe',
          email: "john+test@example.com",
          message:
            'This message contains <script>alert("xss")</script> and other special characters: & < > " \'',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe("Email sent successfully");

      // Verify emails were sent and special characters were handled
      expect(mockSendMail).toHaveBeenCalledTimes(2);

      // First call: Email to admin
      expect(mockSendMail).toHaveBeenNthCalledWith(1, {
        from: "Test User <test@example.com>",
        to: "admin@example.com",
        subject:
          'New Contact Form Submission from John "The Boss" Doe - franklynam.com',
        html: expect.stringContaining('John "The Boss" Doe'),
      });

      // Second call: Confirmation email to user
      expect(mockSendMail).toHaveBeenNthCalledWith(2, {
        from: "Test User <test@example.com>",
        to: "john+test@example.com",
        subject: "Thank you for reaching out - franklynam.com",
        html: expect.stringContaining('John "The Boss" Doe'),
      });
    });

    it("should validate email format correctly", async () => {
      const invalidEmails = [
        "plainaddress",
        "@missingdomain.com",
        "missing@.com",
        "spaces @example.com",
        "multiple@@example.com",
      ];

      for (const email of invalidEmails) {
        const request = new NextRequest("http://localhost:3000/api/contact", {
          method: "POST",
          body: JSON.stringify({
            name: "John Doe",
            email,
            message: "This is a valid message with enough characters",
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe("Invalid email format");
      }
    });

    it("should accept valid email formats", async () => {
      const nodemailer = require("nodemailer");
      const mockSendMail = jest
        .fn()
        .mockResolvedValue({ messageId: "test-id" });
      nodemailer.createTransport.mockReturnValue({
        sendMail: mockSendMail,
      });

      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.org",
        "123@example.com",
      ];

      for (const email of validEmails) {
        const request = new NextRequest("http://localhost:3000/api/contact", {
          method: "POST",
          body: JSON.stringify({
            name: "John Doe",
            email,
            message: "This is a valid message with enough characters",
          }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe("Email sent successfully");
      }
    });
  });
});
