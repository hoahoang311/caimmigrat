import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

/**
 * Create a nodemailer transporter instance
 * Configure with environment variables:
 * - EMAIL_HOST: SMTP server host
 * - EMAIL_PORT: SMTP server port
 * - EMAIL_USER: SMTP username
 * - EMAIL_PASSWORD: SMTP password
 * - EMAIL_FROM: Default sender email address
 */
function createTransporter(isCamp: boolean) {
  const host = process.env.EMAIL_HOST;
  const port = parseInt(process.env.EMAIL_PORT || "587");
  const user = isCamp ? process.env.EMAIL_USER_CAMP : process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASSWORD;

  if (!host || !user || !password) {
    throw new Error(
      "Email configuration is missing. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASSWORD environment variables."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass: password,
    },
  });
}

/**
 * Send an email using nodemailer
 * @param options - Email options including recipient, subject, and content
 * @returns Promise that resolves when email is sent successfully
 * @throws Error if email configuration is missing or sending fails
 */
export async function sendEmail(
  options: EmailOptions,
  isCamp = false,
  from: string
) {
  try {
    const transporter = createTransporter(isCamp);

    const mailOptions = {
      from,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
      cc: options.cc
        ? Array.isArray(options.cc)
          ? options.cc.join(", ")
          : options.cc
        : undefined,
      bcc: options.bcc
        ? Array.isArray(options.bcc)
          ? options.bcc.join(", ")
          : options.bcc
        : undefined,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Send a summer camp registration notification email
 * @param data - Registration form data
 */
export async function sendSummerCampRegistrationEmail(data: {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  studentEmail: string;
  parentEmail: string;
  parentPhone: string;
  countryOfOrigin: string;
  currentCountry?: string;
  visaType?: string;
  program: string;
  startDate: string;
}) {
  const programName =
    data.program === "2-week"
      ? "2-Week Toronto Adventure"
      : "3-Week Canadian Grand Tour";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-row { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1e40af; }
          .value { margin-left: 10px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍁 Toronto Summer Camp 2026 Registration 🍁</h1>
            <p>FIFA World Cup Special Edition</p>
          </div>
          <div class="content">
            <p>A new registration has been submitted for the Toronto Summer Camp 2026:</p>

            <h2>Student Information</h2>
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${data.firstName} ${data.lastName}</span>
            </div>
            <div class="info-row">
              <span class="label">Date of Birth:</span>
              <span class="value">${data.dateOfBirth}</span>
            </div>
            <div class="info-row">
              <span class="label">Student Email:</span>
              <span class="value">${data.studentEmail}</span>
            </div>

            <h2>Parent/Guardian Information</h2>
            <div class="info-row">
              <span class="label">Parent Email:</span>
              <span class="value">${data.parentEmail}</span>
            </div>
            <div class="info-row">
              <span class="label">Parent Phone:</span>
              <span class="value">${data.parentPhone}</span>
            </div>

            <h2>Location Information</h2>
            <div class="info-row">
              <span class="label">Country of Origin:</span>
              <span class="value">${data.countryOfOrigin}</span>
            </div>
            ${
              data.currentCountry
                ? `
            <div class="info-row">
              <span class="label">Current Country:</span>
              <span class="value">${data.currentCountry}</span>
            </div>
            `
                : ""
            }
            ${
              data.visaType
                ? `
            <div class="info-row">
              <span class="label">Visa/Permit Type:</span>
              <span class="value">${data.visaType}</span>
            </div>
            `
                : ""
            }

            <h2>Program Details</h2>
            <div class="info-row">
              <span class="label">Selected Program:</span>
              <span class="value">${programName}</span>
            </div>
            <div class="info-row">
              <span class="label">Start Date:</span>
              <span class="value">${new Date(data.startDate).toLocaleDateString(
                "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}</span>
            </div>

            <div class="footer">
              <p><strong>ICBM Law - Immigration & Business Management</strong></p>
              <p>Toronto Summer Camp 2026 - FIFA World Cup Special Edition</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Toronto Summer Camp 2026 Registration - FIFA World Cup Special Edition

Student Information:
- Name: ${data.firstName} ${data.lastName}
- Date of Birth: ${data.dateOfBirth}
- Student Email: ${data.studentEmail}

Parent/Guardian Information:
- Parent Email: ${data.parentEmail}
- Parent Phone: ${data.parentPhone}

Location Information:
- Country of Origin: ${data.countryOfOrigin}
${data.currentCountry ? `- Current Country: ${data.currentCountry}` : ""}
${data.visaType ? `- Visa/Permit Type: ${data.visaType}` : ""}

Program Details:
- Selected Program: ${programName}
- Start Date: ${new Date(data.startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}

---
ICBM Law - Immigration & Business Management
Toronto Summer Camp 2026 - FIFA World Cup Special Edition
  `;

  // Send notification to admin
  const adminEmail = process.env.EMAIL_CAMP_ADMIN;

  await sendEmail(
    {
      to: adminEmail || "camp@icbmlaw.ca",
      subject: `New Summer Camp Registration: ${data.firstName} ${data.lastName}`,
      text: textContent,
      html: htmlContent,
      replyTo: data.parentEmail,
    },
    true,
    adminEmail || "camp@icbmlaw.ca"
  );

  // Send confirmation to parent
  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight { background-color: #D9BA4E; color: #1e40af; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍁 Registration Confirmed! 🍁</h1>
            <p>Toronto Summer Camp 2026 - FIFA World Cup Special Edition</p>
          </div>
          <div class="content">
            <p>Dear Parent/Guardian,</p>

            <p>Thank you for registering <strong>${data.firstName} ${
    data.lastName
  }</strong> for the Toronto Summer Camp 2026!</p>

            <div class="highlight">
              <h2 style="margin: 0;">⚽ ${programName} ⚽</h2>
              <p style="margin: 5px 0;">Starting: ${new Date(
                data.startDate
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
            </div>

            <p>We have received your registration and our team will review it shortly. You will receive a follow-up email with:</p>
            <ul>
              <li>Payment instructions</li>
              <li>Required documents checklist</li>
              <li>Pre-departure information</li>
              <li>Contact information for our support team</li>
            </ul>

            <p><strong>Important Dates:</strong></p>
            <ul>
              <li>Registration Deadline: March 1st, 2026</li>
              <li>Full Payment Due: March 31st, 2026</li>
            </ul>

            <p>If you have any questions, please don't hesitate to contact us.</p>

            <div class="footer">
              <p><strong>ICBM Law - Immigration & Business Management</strong></p>
              <p>Email: info@icbmlaw.ca | Phone: [Your Phone Number]</p>
              <p>Toronto Summer Camp 2026 - An Unforgettable Adventure Awaits!</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail(
    {
      to: data.parentEmail,
      subject: "Summer Camp Registration Confirmed - Toronto 2026",
      html: confirmationHtml,
      cc: data.studentEmail,
    },
    true,
    adminEmail || "camp@icbmlaw.ca"
  );
}

/**
 * Send a contact form inquiry notification email
 * @param data - Contact form data
 */
export async function sendContactFormEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  serviceType?: string | null;
  subject?: string | null;
  message: string;
  countryOfOrigin?: string | null;
  preferredContactMethod: string;
}) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-row { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1e40af; }
          .value { margin-left: 10px; }
          .message-box { background-color: white; padding: 20px; border-left: 4px solid #D9BA4E; margin: 20px 0; border-radius: 4px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>ICBM Law - Client Inquiry</p>
          </div>
          <div class="content">
            <h2>Contact Information</h2>
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">${data.firstName} ${data.lastName}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${data.email}</span>
            </div>
            ${
              data.phone
                ? `
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">${data.phone}</span>
            </div>
            `
                : ""
            }
            ${
              data.countryOfOrigin
                ? `
            <div class="info-row">
              <span class="label">Country of Origin:</span>
              <span class="value">${data.countryOfOrigin}</span>
            </div>
            `
                : ""
            }
            <div class="info-row">
              <span class="label">Preferred Contact Method:</span>
              <span class="value">${
                data.preferredContactMethod === "email" ? "Email" : "Phone"
              }</span>
            </div>

            ${
              data.serviceType
                ? `
            <h2>Service Interest</h2>
            <div class="info-row">
              <span class="label">Service Type:</span>
              <span class="value">${data.serviceType}</span>
            </div>
            `
                : ""
            }

            ${
              data.subject
                ? `
            <h2>Subject</h2>
            <div class="info-row">
              <span class="value">${data.subject}</span>
            </div>
            `
                : ""
            }

            <h2>Message</h2>
            <div class="message-box">
              ${data.message.replace(/\n/g, "<br>")}
            </div>

            <div class="footer">
              <p><strong>ICBM Law - Immigration & Business Management</strong></p>
              <p>240 Humberline Dr, Toronto, ON M9W 5X1, Canada</p>
              <p>Phone: +1 416-639-2655 | Email: info@icbmlaw.ca</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
New Contact Form Submission - ICBM Law

Contact Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ""}
${data.countryOfOrigin ? `- Country of Origin: ${data.countryOfOrigin}` : ""}
- Preferred Contact Method: ${
    data.preferredContactMethod === "email" ? "Email" : "Phone"
  }

${
  data.serviceType
    ? `Service Interest:\n- Service Type: ${data.serviceType}\n`
    : ""
}
${data.subject ? `Subject:\n${data.subject}\n` : ""}
Message:
${data.message}

---
ICBM Law - Immigration & Business Management
240 Humberline Dr, Toronto, ON M9W 5X1, Canada
Phone: +1 416-639-2655 | Email: info@icbmlaw.ca
  `;

  // Send notification to admin
  const adminEmail = process.env.EMAIL_INFO;

  await sendEmail(
    {
      to: adminEmail || "info@icbmlaw.ca",
      subject: `New Contact Form: ${data.firstName} ${data.lastName}${
        data.subject ? ` - ${data.subject}` : ""
      }`,
      text: textContent,
      html: htmlContent,
      replyTo: data.email,
    },
    false,
    adminEmail || "info@icbmlaw.ca"
  );

  // Send confirmation to client
  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight { background-color: #D9BA4E; color: #1e40af; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; font-weight: bold; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Us!</h1>
            <p>ICBM Law - Immigration & Business Management</p>
          </div>
          <div class="content">
            <p>Dear ${data.firstName} ${data.lastName},</p>

            <p>Thank you for reaching out to ICBM Law. We have received your inquiry and one of our immigration specialists will review your message shortly.</p>

            <div class="highlight">
              We typically respond within 1-2 business days
            </div>

            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will carefully review your inquiry</li>
              <li>We'll contact you via ${
                data.preferredContactMethod === "email" ? "email" : "phone"
              } to discuss your needs</li>
              <li>We'll provide you with personalized guidance for your situation</li>
            </ul>

            <p><strong>In the meantime:</strong></p>
            <ul>
              <li>Check out our <a href="https://www.icbmlaw.ca/services" style="color: #1e40af;">services page</a> for more information</li>
              <li>For urgent matters, call us at <a href="tel:+14166392655" style="color: #1e40af;">+1 416-639-2655</a></li>
            </ul>

            <div class="footer">
              <p><strong>ICBM Law - Immigration & Business Management</strong></p>
              <p>240 Humberline Dr, Toronto, ON M9W 5X1, Canada</p>
              <p>Phone: +1 416-639-2655 | Email: info@icbmlaw.ca</p>
              <p style="margin-top: 15px;">
                <a href="https://www.facebook.com/profile.php?id=61581800467455" style="margin: 0 5px; color: #1e40af;">Facebook</a> |
                <a href="https://www.instagram.com/icbm.law.ca/" style="margin: 0 5px; color: #1e40af;">Instagram</a> |
                <a href="https://www.tiktok.com/@icbm.law.ca" style="margin: 0 5px; color: #1e40af;">TikTok</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail(
    {
      to: data.email,
      subject: "Thank you for contacting ICBM Law",
      html: confirmationHtml,
    },
    false,
    adminEmail || "info@icbmlaw.ca"
  );
}
