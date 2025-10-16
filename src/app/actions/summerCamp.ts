"use server";

import { sendSummerCampRegistrationEmail } from "@/lib/email";

export interface SummerCampFormData {
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
}

export async function submitSummerCampRegistration(
  formData: SummerCampFormData
) {
  try {
    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "studentEmail",
      "parentEmail",
      "parentPhone",
      "countryOfOrigin",
      "program",
      "startDate",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof SummerCampFormData]) {
        return {
          success: false,
          error: `Missing required field: ${field}`,
        };
      }
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.studentEmail)) {
      return {
        success: false,
        error: "Invalid student email address",
      };
    }
    if (!emailRegex.test(formData.parentEmail)) {
      return {
        success: false,
        error: "Invalid parent email address",
      };
    }

    // Validate date of birth (student should be between 8-17 years old)
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const actualAge =
      monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())
        ? age - 1
        : age;

    if (actualAge < 8 || actualAge > 17) {
      return {
        success: false,
        error: "Student must be between 8 and 17 years old",
      };
    }

    // Validate program type
    if (!["2-week", "3-week"].includes(formData.program)) {
      return {
        success: false,
        error: "Invalid program selection",
      };
    }

    // Validate start date
    const validStartDates = ["2026-06-01", "2026-06-07", "2026-06-14"];
    if (!validStartDates.includes(formData.startDate)) {
      return {
        success: false,
        error: "Invalid start date selection",
      };
    }

    // Send email notifications in the background (non-blocking)
    // Don't await this - let it run asynchronously
    sendSummerCampRegistrationEmail({
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      studentEmail: formData.studentEmail,
      parentEmail: formData.parentEmail,
      parentPhone: formData.parentPhone,
      countryOfOrigin: formData.countryOfOrigin,
      currentCountry: formData.currentCountry,
      visaType: formData.visaType,
      program: formData.program,
      startDate: formData.startDate,
    }).catch((emailError) => {
      // Log email errors but don't fail the request
      console.error("Error sending camp registration email:", emailError);
    });

    return {
      success: true,
      message: "Registration submitted successfully!",
    };
  } catch (error) {
    console.error("Error submitting summer camp registration:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit registration. Please try again.",
    };
  }
}
