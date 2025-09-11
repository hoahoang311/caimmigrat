import type { Metadata } from "next";
import { MapPin, Phone, Clock, Mail, Facebook, Instagram } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/forms/ContactForm';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Contact Us - ICBM Law",
  description: "Contact ICBM Law for expert Canadian immigration consultation. Visit our Toronto office, call +1 416-992-7429, or email info@icbmlaw.com. Virtual consultations available.",
  keywords: "contact immigration lawyer, Canadian immigration consultation, ICBM Law Toronto, immigration consultant contact, book consultation, immigration help"
};


type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.page.office_address'),
      details: ['240 Humberline Dr', 'Toronto, ON M9W 5X1', 'Canada'],
    },
    {
      icon: Phone,
      title: t('contact.page.phone'),
      details: ['+1 416-992-7429'],
      link: 'tel:+14169927429',
    },
    {
      icon: Mail,
      title: t('contact.page.email'),
      details: ['info@icbmlaw.com'],
      link: 'mailto:info@icbmlaw.com',
    },
    {
      icon: Clock,
      title: t('contact.page.business_hours'),
      details: [
        t('contact.page.business_hours_details.0'),
        t('contact.page.business_hours_details.1'),
      ],
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t('contact.page.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.page.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <info.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-sm text-muted-foreground">
                        {info.link && detailIndex === 0 ? (
                          <a 
                            href={info.link} 
                            className="text-blue-600 hover:underline"
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Embed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <span>{t('contact.page.location_title')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('contact.page.location_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.159537859618!2d-79.58470682471452!3d43.63749825695164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b39c76b9b1c9b%3A0x1c5c8a4c7f4b2e3a!2s240%20Humberline%20Dr%2C%20Etobicoke%2C%20ON%20M9W%205X1%2C%20Canada!5e0!3m2!1sen!2sus!4v1703628000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ICBM Law Office Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact.page.visit_office_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('contact.page.visit_office_benefits.0')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('contact.page.visit_office_benefits.1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('contact.page.visit_office_benefits.2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t('contact.page.visit_office_benefits.3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800">{t('contact.page.urgent_assistance_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-700 mb-3">
                    {t('contact.page.urgent_assistance_description')}
                  </p>
                  <a 
                    href="tel:+14169927429"
                    className="inline-flex items-center space-x-2 text-orange-800 font-medium hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+1 416-992-7429</span>
                  </a>
                </CardContent>
              </Card>
              
              {/* Social Media */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center space-x-2">
                    <span>{t('contact.page.follow_us_title')}</span>
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    {t('contact.page.follow_us_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a href="#" className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group" aria-label="Facebook">
                      <Facebook className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                    </a>
                    <a href="#" className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group" aria-label="Instagram">
                      <Instagram className="h-6 w-6 text-pink-600 group-hover:text-pink-700" />
                    </a>
                    <a href="#" className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group" aria-label="TikTok">
                      <svg className="h-6 w-6 text-black group-hover:text-gray-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </a>
                    <a href="#" className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group" aria-label="Threads">
                      <svg className="h-6 w-6 text-black group-hover:text-gray-800" fill="currentColor" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                        <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('contact.page.faq_title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('contact.page.faq_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{t(`contact.page.faq_items.${index}.question`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(`contact.page.faq_items.${index}.answer`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}