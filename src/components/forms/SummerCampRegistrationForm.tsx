"use client";

import { submitSummerCampRegistration } from "@/app/actions/summerCamp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Star,
  Trophy,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SummerCampRegistrationForm() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const program1Features = [
    "15 Hrs/Week English Classes (Experienced ESL Teachers)",
    "Canon Canada Arts Training & Recognized Level 1 Credit",
    "Accommodation (U of T Dorm) & Full Board (3 Meals/Day)",
    "Major Toronto Attractions (CN Tower, Niagara Falls, ROM)",
    "Exclusive FIFA World Cup Fan Festival Experience",
  ];

  const program2Features = [
    "All 2-Week features, PLUS an enhanced itinerary",
    "5-Day East Coast Excursion Trip (Transportation, Accommodation & Food Included)",
    "Explore Canada's Historic Capitals: Ottawa, Montreal, and Quebec City",
    "Full Day of Activities: Admission tickets covered",
    "Enhanced Cultural Performance and Networking Opportunities",
  ];

  const handleEnrollClick = () => {
    setShowForm(true);
    setSuccess(false);
    setTimeout(() => {
      const form = document.querySelector("#registration-form");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCancel = () => {
    setShowForm(false);
    setError(null);
    setSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      studentEmail: formData.get("studentEmail") as string,
      parentEmail: formData.get("parentEmail") as string,
      parentPhone: formData.get("parentPhone") as string,
      countryOfOrigin: formData.get("countryOfOrigin") as string,
      currentCountry: formData.get("currentCountry") as string,
      visaType: formData.get("visaType") as string,
      program: formData.get("program") as string,
      startDate: formData.get("startDate") as string,
    };

    try {
      const result = await submitSummerCampRegistration(data);

      if (result.success) {
        // Show success message and reset form
        setSuccess(true);
        formElement.reset();

        // Scroll to top to show success message
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 3000);
      } else {
        setError(result.error || "Failed to submit registration");
        // Scroll to top to show error message
        setTimeout(() => {
          const form = document.querySelector("#registration-form");
          if (form) {
            form.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An unexpected error occurred. Please try again.");
      // Scroll to top to show error message
      setTimeout(() => {
        const form = document.querySelector("#registration-form");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Premium Program Options
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Program 1 */}
            <Card className="border-2 border-gray-200 hover:border-[#D9BA4E] transition-colors flex flex-col">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="text-sm font-semibold text-[#D9BA4E] mb-2">
                  PROGRAM 1
                </div>
                <CardTitle className="text-2xl">
                  2-Week Toronto Adventure
                </CardTitle>
                <CardDescription className="text-base">
                  Flexible start dates in June 2026: 1st, 7th, or 14th
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 flex flex-col justify-between flex-grow">
                <ul className="space-y-3">
                  {program1Features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-[#D9BA4E] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handleEnrollClick}
                  className="w-full mt-8 bg-primary hover:bg-primary/90"
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>

            {/* Program 2 */}
            <Card className="border-2 border-[#D9BA4E] shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#D9BA4E] text-primary px-3 py-1 rounded-full text-xs font-bold">
                HIGHLY RECOMMENDED
              </div>
              <CardHeader className="bg-gradient-to-br from-[#D9BA4E]/10 to-[#D9BA4E]/20">
                <div className="text-sm font-semibold text-[#D9BA4E] mb-2">
                  PROGRAM 2
                </div>
                <CardTitle className="text-2xl">
                  3-Week Canadian Grand Tour
                </CardTitle>
                <CardDescription className="text-base">
                  Flexible start dates in June 2026: 1st, 7th, or 14th
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {program2Features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Star className="h-5 w-5 text-[#D9BA4E] fill-[#D9BA4E] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handleEnrollClick}
                  className="w-full mt-8 bg-[#D9BA4E] hover:bg-[#c9a83e] text-primary"
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Message Section */}
      {success && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl border-2 border-green-200">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Registration Submitted Successfully!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Thank you for registering for the Toronto Summer Camp 2026
                      - FIFA World Cup Special Edition.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
                    <h3 className="font-semibold text-green-900 mb-3">
                      What happens next?
                    </h3>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span>
                          Check your email for a confirmation message with full
                          registration details
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span>
                          Our team will review your application and contact you
                          within 2-3 business days
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span>
                          You will receive payment instructions and required
                          documents checklist
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={() => {
                        setSuccess(false);
                        setShowForm(false);
                      }}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Return to Home
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Registration Form Section - Only show when showForm is true and success is false */}
      {showForm && !success && (
        <section id="registration-form" className="py-20 bg-white scroll-mt-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Register for Summer Camp 2026
              </h2>
              <p className="text-lg text-gray-600">
                Complete the form below to secure your spot
              </p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 pb-4 border-b">
                      <User className="h-5 w-5 text-[#D9BA4E]" />
                      <span>Student Information</span>
                    </h3>

                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                      />
                    </div>

                    {/* Student Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Personal Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="studentEmail"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                          placeholder="student@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parent/Guardian Information */}
                  <div className="space-y-6 pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 pb-4 border-b">
                      <User className="h-5 w-5 text-[#D9BA4E]" />
                      <span>Parent/Guardian Information</span>
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent&apos;s Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="parentEmail"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                          placeholder="parent@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent&apos;s Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="parentPhone"
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-6 pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 pb-4 border-b">
                      <MapPin className="h-5 w-5 text-[#D9BA4E]" />
                      <span>Location Information</span>
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country of Origin *
                      </label>
                      <input
                        type="text"
                        name="countryOfOrigin"
                        list="countries"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                        placeholder="Start typing to search..."
                      />
                      <datalist id="countries">
                        <option value="Afghanistan" />
                        <option value="Albania" />
                        <option value="Algeria" />
                        <option value="Argentina" />
                        <option value="Australia" />
                        <option value="Austria" />
                        <option value="Bangladesh" />
                        <option value="Belgium" />
                        <option value="Brazil" />
                        <option value="Canada" />
                        <option value="Chile" />
                        <option value="China" />
                        <option value="Colombia" />
                        <option value="Czech Republic" />
                        <option value="Denmark" />
                        <option value="Egypt" />
                        <option value="Finland" />
                        <option value="France" />
                        <option value="Germany" />
                        <option value="Greece" />
                        <option value="Hong Kong" />
                        <option value="Hungary" />
                        <option value="India" />
                        <option value="Indonesia" />
                        <option value="Iran" />
                        <option value="Iraq" />
                        <option value="Ireland" />
                        <option value="Israel" />
                        <option value="Italy" />
                        <option value="Japan" />
                        <option value="Jordan" />
                        <option value="Kenya" />
                        <option value="South Korea" />
                        <option value="Kuwait" />
                        <option value="Lebanon" />
                        <option value="Malaysia" />
                        <option value="Mexico" />
                        <option value="Morocco" />
                        <option value="Netherlands" />
                        <option value="New Zealand" />
                        <option value="Nigeria" />
                        <option value="Norway" />
                        <option value="Pakistan" />
                        <option value="Peru" />
                        <option value="Philippines" />
                        <option value="Poland" />
                        <option value="Portugal" />
                        <option value="Qatar" />
                        <option value="Romania" />
                        <option value="Russia" />
                        <option value="Saudi Arabia" />
                        <option value="Singapore" />
                        <option value="South Africa" />
                        <option value="Spain" />
                        <option value="Sri Lanka" />
                        <option value="Sweden" />
                        <option value="Switzerland" />
                        <option value="Taiwan" />
                        <option value="Thailand" />
                        <option value="Turkey" />
                        <option value="Ukraine" />
                        <option value="United Arab Emirates" />
                        <option value="United Kingdom" />
                        <option value="United States" />
                        <option value="Vietnam" />
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Country Living In
                      </label>
                      <input
                        type="text"
                        name="currentCountry"
                        list="countries"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                        placeholder="Start typing to search..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Visa/Permit Type (if applicable)
                      </label>
                      <input
                        type="text"
                        name="visaType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                        placeholder="e.g., Student visa, Work permit, etc."
                      />
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div className="space-y-6 pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 pb-4 border-b">
                      <Calendar className="h-5 w-5 text-[#D9BA4E]" />
                      <span>Program Selection</span>
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Program *
                      </label>
                      <select
                        name="program"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                      >
                        <option value="">Choose a program</option>
                        <option value="2-week">2-Week Toronto Adventure</option>
                        <option value="3-week">
                          3-Week Canadian Grand Tour (Recommended)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <select
                        name="startDate"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent"
                      >
                        <option value="">Choose a start date</option>
                        <option value="2026-06-01">June 1st, 2026</option>
                        <option value="2026-06-07">June 7th, 2026</option>
                        <option value="2026-06-14">June 14th, 2026</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit and Cancel Buttons */}
                  <div className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 text-lg py-6"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="w-full bg-[#D9BA4E] hover:bg-[#c9a83e] text-primary text-lg py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Registration"}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      * Required fields
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-emerald-600 to-primary text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Trophy className="h-16 w-16 mx-auto mb-6 text-[#D9BA4E] drop-shadow-lg" />
          <h2 className="text-3xl font-bold mb-4 drop-shadow-md">LIMITED SPACES AVAILABLE!</h2>
          <p className="text-xl mb-8 font-medium">
            Don&apos;t miss the 2026 FIFA World Cup Special Edition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-white/90 text-gray-900 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                <p className="font-semibold">Registration Deadline</p>
              </div>
              <p className="text-2xl font-bold text-teal-700">1st March 2026</p>
            </div>
            <div className="bg-white/90 text-gray-900 rounded-lg p-6 shadow-xl transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                <p className="font-semibold">Full Payment Due</p>
              </div>
              <p className="text-2xl font-bold text-teal-700">31st March 2026</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-bold">LIMITED SPOTS AVAILABLE!</p>
            <Button
              onClick={handleEnrollClick}
              size="lg"
              className="bg-[#D9BA4E] hover:bg-[#c9a83e] text-primary text-lg px-10 py-7 shadow-xl font-bold transform hover:scale-105 transition-all"
            >
              ENROLL TODAY
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/30">
            <p className="text-sm max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <strong>Cancellation Protection:</strong> A partial or full refund
              is issued if the Canadian Visa application is refused upon
              submission of IRCC refusal letter. See terms and conditions
              applied.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
