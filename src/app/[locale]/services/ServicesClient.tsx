"use client";

import { BookingPopup } from "@/components/shared/BookingPopup";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ServicesClientProps {
  locale: string;
  bookConsultationText: string;
  callNowText: string;
}

export default function ServicesClient({
  locale,
  bookConsultationText,
  callNowText,
}: ServicesClientProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => setBookingOpen(true)}
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
        >
          <Calendar className="mr-2 h-5 w-5" />
          {bookConsultationText}
        </Button>
        <Button
          asChild
          size="lg"
          className="bg-[#D9BA4E] hover:bg-[#c9a83e] text-primary border-none shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Link href="tel:+14166392655" className="flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            {callNowText}
          </Link>
        </Button>
      </div>

      <BookingPopup open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
