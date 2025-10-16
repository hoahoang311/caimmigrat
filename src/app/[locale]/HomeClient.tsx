"use client";

import { BookingPopup } from "@/components/shared/BookingPopup";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HomeClientProps {
  locale: string;
  ctaText: string;
  bookConsultationText: string;
}

export default function HomeClient({
  locale,
  ctaText,
  bookConsultationText,
}: HomeClientProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button
          asChild
          size="lg"
          className="bg-[#D9BA4E] hover:bg-[#c9a83e] text-primary"
        >
          <Link href={`${locale}/contact`}>
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          onClick={() => setBookingOpen(true)}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Calendar className="mr-2 h-5 w-5" />
          {bookConsultationText}
        </Button>
      </div>

      <BookingPopup open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
