import { sendContactFormEmail } from "@/lib/email";
import { database, type Inquiry } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email || !body.message) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: first_name, last_name, email, message",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const inquiry: Inquiry = {
      first_name: body.first_name.trim(),
      last_name: body.last_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      service_type: body.service_type?.trim() || null,
      subject: body.subject?.trim() || null,
      message: body.message.trim(),
      country_of_origin: body.country_of_origin?.trim() || null,
      preferred_contact_method: body.preferred_contact_method || "email",
    };

    // Save to database
    const result = await database.createInquiry(inquiry);

    // Send email notifications in the background (non-blocking)
    // Don't await this - let it run asynchronously
    sendContactFormEmail({
      firstName: inquiry.first_name,
      lastName: inquiry.last_name,
      email: inquiry.email,
      phone: inquiry.phone,
      serviceType: inquiry.service_type,
      subject: inquiry.subject,
      message: inquiry.message,
      countryOfOrigin: inquiry.country_of_origin,
      preferredContactMethod: inquiry.preferred_contact_method || "email",
    }).catch((emailError) => {
      // Log email errors but don't fail the request
      console.error("Error sending email notification:", emailError);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const inquiries = await database.getInquiries(limit, offset);

    return NextResponse.json({
      success: true,
      data: inquiries,
      count: inquiries.length,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
