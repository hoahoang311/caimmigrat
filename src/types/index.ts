export interface AssessmentFormData {
  name: string;
  email: string;
  phone: string;
  program: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email?: string;
  mapUrl?: string;
}