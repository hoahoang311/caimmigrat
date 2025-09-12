import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ConsultationBooking,
  database,
  Inquiry,
  NewsletterSubscriber,
} from "@/lib/supabase";
import {
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import InquiryCalendar from "./components/InquiryCalendar";

export default async function AdminDashboard() {
  noStore();
  
  const [inquiries, newsletterSubs, consultations]: [
    Inquiry[],
    NewsletterSubscriber[],
    ConsultationBooking[]
  ] = await Promise.all([
    database.getInquiries(),
    database.getNewsletterSubscribers(),
    database.getConsultationBookings(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Inquiries
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries.length}</div>
              <p className="text-xs text-gray-500">Contact form submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Newsletter Subscribers
              </CardTitle>
              <Mail className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsletterSubs.length}</div>
              <p className="text-xs text-gray-500">Active subscribers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Consultation Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations.length}</div>
              <p className="text-xs text-gray-500">Appointment requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="subscribers"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger
              value="consultations"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Consultations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span>Newsletter Subscribers</span>
                </CardTitle>
                <CardDescription>
                  All active newsletter subscribers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsletterSubs.slice(0, 20).map((subscriber) => (
                    <div key={subscriber.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{subscriber.email}</h4>
                        <span className="text-xs text-gray-500">
                          {subscriber.subscribed_at
                            ? new Date(
                                subscriber.subscribed_at
                              ).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      {subscriber.preferred_topics && (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            Interested in:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {subscriber.preferred_topics
                              .split(",")
                              .map((topic: string, index: number) => (
                                <span
                                  key={index}
                                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                                >
                                  {topic.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {newsletterSubs.length === 0 && (
                    <div className="text-center py-8">
                      <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No subscribers yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <InquiryCalendar inquiries={inquiries} />
          </TabsContent>

          <TabsContent value="consultations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Consultation Requests</span>
                </CardTitle>
                <CardDescription>
                  All appointment booking requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">
                          {booking.first_name} {booking.last_name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {booking.created_at
                            ? new Date(booking.created_at).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3" />
                          <span>{booking.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3" />
                          <span>{booking.phone}</span>
                        </div>
                        {booking.service_interest && (
                          <div className="flex items-center space-x-2">
                            <Users className="h-3 w-3" />
                            <span>{booking.service_interest}</span>
                          </div>
                        )}
                        {booking.preferred_date && (
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3" />
                            <span>Preferred: {booking.preferred_date}</span>
                          </div>
                        )}
                      </div>
                      {booking.message && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                          {booking.message}
                        </p>
                      )}
                    </div>
                  ))}
                  {consultations.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No consultation requests yet
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
