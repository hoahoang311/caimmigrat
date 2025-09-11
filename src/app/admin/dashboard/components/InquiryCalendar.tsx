"use client";

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
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  service_type?: string;
  subject?: string;
  country_of_origin?: string;
  preferred_contact_method?: string;
  message: string;
  created_at: string;
}

interface InquiryCalendarProps {
  inquiries: Inquiry[];
}

export default function InquiryCalendar({ inquiries }: InquiryCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentDate(new Date());
    setFilteredInquiries(inquiries);
    setMounted(true);
  }, []);

  // Get current month and year
  const currentMonth = currentDate?.getMonth();
  const currentYear = currentDate?.getFullYear();

  // Get first day of the month and number of days
  const firstDayOfMonth =
    currentMonth !== undefined && currentYear !== undefined
      ? new Date(currentYear, currentMonth, 1)
      : new Date();
  const lastDayOfMonth =
    currentMonth !== undefined && currentYear !== undefined
      ? new Date(currentYear, currentMonth + 1, 0)
      : new Date();
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Generate calendar days
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get inquiries for a specific date
  const getInquiriesForDate = (day: number) => {
    if (currentMonth === undefined || currentYear === undefined) {
      return [];
    }
    const dateStr =
      currentMonth !== undefined && currentYear !== undefined
        ? `${currentYear}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
        : "";
    if (!dateStr) {
      return [];
    }
    return inquiries.filter((inquiry) =>
      inquiry.created_at.startsWith(dateStr)
    );
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    if (currentMonth === undefined || currentYear === undefined) {
      return;
    }
    const dateStr =
      currentMonth !== undefined && currentYear !== undefined
        ? `${currentYear}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
        : "";
    if (selectedDate === dateStr) {
      // Deselect if clicking the same date
      setSelectedDate(null);
      setFilteredInquiries(inquiries);
    } else {
      setSelectedDate(dateStr);
      const dayInquiries = getInquiriesForDate(day);
      setFilteredInquiries(dayInquiries);
    }
  };

  // Navigate months
  const goToPreviousMonth = () => {
    if (currentYear !== undefined && currentMonth !== undefined) {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    }
    setSelectedDate(null);
    setFilteredInquiries(inquiries);
  };

  const goToNextMonth = () => {
    if (currentYear !== undefined && currentMonth !== undefined) {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    }
    setSelectedDate(null);
    setFilteredInquiries(inquiries);
  };

  const clearFilter = () => {
    setSelectedDate(null);
    setFilteredInquiries(inquiries);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Filter by Date</span>
            </div>
            {selectedDate && (
              <Button variant="ghost" size="sm" onClick={clearFilter}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Click on a date to filter inquiries
            {selectedDate && (
              <span className="block text-blue-600 font-medium mt-1">
                Showing: {new Date(selectedDate).toLocaleDateString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium">
              {currentMonth !== undefined ? months[currentMonth] : ""}{" "}
              {currentYear ?? ""}
            </h3>
            <Button variant="ghost" size="sm" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, idx) => (
              <div
                key={`${day}-${idx}`}
                className="text-center text-xs font-medium text-gray-500 p-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={(day || "") + index} className="p-2"></div>;
              }

              const inquiriesForDay = getInquiriesForDate(day);
              const hasInquiries = inquiriesForDay.length > 0;
              let dateStr = "";
              if (currentMonth !== undefined && currentYear !== undefined) {
                dateStr = `${currentYear}-${(currentMonth + 1)
                  .toString()
                  .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
              }
              const isSelected = selectedDate === dateStr;
              const isToday =
                currentMonth !== undefined &&
                currentYear !== undefined &&
                new Date().toDateString() ===
                  new Date(currentYear, currentMonth, day).toDateString();

              return (
                <button
                  key={day + index}
                  onClick={() => handleDateSelect(day)}
                  className={`
                    p-2 text-sm rounded-md transition-colors relative
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isToday
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : hasInquiries
                        ? "bg-green-50 text-green-800 hover:bg-green-100"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {day}
                  {hasInquiries && (
                    <div
                      className={`
                      absolute top-1 right-1 w-2 h-2 rounded-full
                      ${isSelected ? "bg-white" : "bg-green-500"}
                    `}
                    />
                  )}
                  {hasInquiries && (
                    <div className="text-xs text-center mt-1">
                      {inquiriesForDay.length}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filtered Inquiries */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span>
              {selectedDate
                ? "Inquiries for Selected Date"
                : "All Recent Inquiries"}
            </span>
          </CardTitle>
          <CardDescription>
            {selectedDate
              ? `${filteredInquiries.length} inquiry(ies) on ${new Date(
                  selectedDate
                ).toLocaleDateString()}`
              : `Showing ${filteredInquiries.length} recent inquiries`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredInquiries.slice(0, 10).map((inquiry, idx) => (
              <div key={inquiry.id + idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">
                    {inquiry.first_name} {inquiry.last_name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </span>
                </div>

                {/* Subject */}
                {inquiry.subject && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-800 bg-blue-50 px-2 py-1 rounded">
                      {inquiry.subject}
                    </span>
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-1 text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3 text-blue-500" />
                    <span>{inquiry.email}</span>
                    {inquiry.preferred_contact_method === "email" && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full ml-1">
                        Preferred
                      </span>
                    )}
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3 text-green-500" />
                      <span>{inquiry.phone}</span>
                      {inquiry.preferred_contact_method === "phone" && (
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full ml-1">
                          Preferred
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Service & Location Details */}
                <div className="space-y-1 text-sm text-gray-600 mb-2">
                  {inquiry.service_type && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3 text-purple-500" />
                      <span className="text-gray-700">
                        Service: {inquiry.service_type}
                      </span>
                    </div>
                  )}
                  {inquiry.country_of_origin && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-3 w-3 text-orange-500" />
                      <span className="text-gray-700">
                        From: {inquiry.country_of_origin}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="border-t pt-2 mt-2">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {inquiry.message}
                  </p>
                </div>
              </div>
            ))}
            {filteredInquiries.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {selectedDate
                    ? "No inquiries for this date"
                    : "No inquiries yet"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
