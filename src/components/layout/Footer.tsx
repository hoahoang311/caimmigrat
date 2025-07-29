import Link from 'next/link';
import { MapPin, Phone, Twitter, Linkedin, Instagram } from 'lucide-react';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CAimmigrat</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted partner for Canadian immigration. We are a team of immigration 
              lawyers, consultants, and experts ready to assist you with your Canadian 
              immigration application.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  601-165 Dundas St W<br />
                  Mississauga, ON L5B 2N6
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+14169927429" className="hover:text-blue-400 transition-colors">
                  +1 416-992-7429
                </a>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-slate-300">
              Subscribe to our newsletter for the latest Canada Immigration news and updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} CAimmigrat. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}