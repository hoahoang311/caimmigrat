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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serviceTypes } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  CheckCircle,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from 'next-intl';

const createContactSchema = (t: (key: string) => string) => z.object({
  firstName: z.string().min(2, t('contact.form.validation.first_name_min')),
  lastName: z.string().min(2, t('contact.form.validation.last_name_min')),
  email: z.string().email(t('contact.form.validation.email_invalid')),
  phone: z.string().optional(),
  serviceType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, t('contact.form.validation.message_min')),
  countryOfOrigin: z.string().optional(),
  preferredContactMethod: z.enum(["email", "phone"]),
});

export default function ContactForm() {
  const t = useTranslations();
  const contactSchema = createContactSchema(t);
  type ContactFormData = z.infer<typeof contactSchema>;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormData, unknown, ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceType: "",
      subject: "",
      message: "",
      countryOfOrigin: "",
      preferredContactMethod: "email",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          service_type: data.serviceType,
          subject: data.subject,
          message: data.message,
          country_of_origin: data.countryOfOrigin,
          preferred_contact_method: data.preferredContactMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="h-6 w-6 text-primary" />
          <span>{t('contact.form.title')}</span>
        </CardTitle>
        <CardDescription>
          {t('contact.form.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center space-y-4 py-8">
            <CheckCircle className="h-16 w-16 text-[#D9BA4E] mx-auto" />
            <h3 className="text-xl font-semibold text-primary">
              {t('contact.form.success_title')}
            </h3>
            <p className="text-muted-foreground">
              {t('contact.form.success_message')}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                  <p className="text-primary text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* First Name Field */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{t('contact.form.first_name')} *</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact.form.first_name_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name Field */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{t('contact.form.last_name')} *</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact.form.last_name_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{t('contact.form.email')} *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('contact.form.email_placeholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{t('contact.form.phone')}</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder={t('contact.form.phone_placeholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Type */}
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{t('contact.form.service')}</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contact.form.service_placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country of Origin */}
                <FormField
                  control={form.control}
                  name="countryOfOrigin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>{t('contact.form.country_origin')}</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('contact.form.country_origin_placeholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Subject Field */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.subject')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('contact.form.subject_placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{t('contact.form.message')} *</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('contact.form.message_placeholder')}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Contact Method */}
              <FormField
                control={form.control}
                name="preferredContactMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.preferred_contact')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">{t('contact.form.contact_email')}</SelectItem>
                        <SelectItem value="phone">{t('contact.form.contact_phone')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
