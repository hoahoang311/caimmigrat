import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AssessmentForm from '@/components/forms/AssessmentForm';
import HeroImage from '@/components/HeroImage';
import { 
  CheckCircle, 
  Users, 
  Award, 
  ArrowRight,
  Calendar,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our team of certified immigration lawyers and consultants have years of experience helping clients achieve their Canadian dreams.',
  },
  {
    icon: Award,
    title: 'Proven Success',
    description: 'With thousands of successful applications, we have the expertise and track record to maximize your chances of approval.',
  },
  {
    icon: Shield,
    title: 'Trusted Process',
    description: 'We follow a comprehensive, transparent process to ensure your application is completed accurately and submitted on time.',
  },
];

const immigrationPrograms = [
  {
    title: 'Express Entry',
    description: 'The fastest pathway to Canadian permanent residence for skilled workers.',
    benefits: ['Processing in 6 months', 'No job offer required', 'Points-based system'],
  },
  {
    title: 'Provincial Nominee Program',
    description: 'Province-specific programs designed to meet local economic needs.',
    benefits: ['Additional 600 points', 'Various streams available', 'Provincial support'],
  },
  {
    title: 'Family Sponsorship',
    description: 'Reunite with your loved ones in Canada through family sponsorship.',
    benefits: ['Sponsor spouse/children', 'Sponsor parents/grandparents', 'No points required'],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32"
        style={{ 
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          minHeight: '100vh'
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Your Journey to{' '}
                  <span className="text-blue-600">Canada</span>{' '}
                  Starts Here
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We are a team of immigration lawyers, consultants, and experts ready to 
                  assist you with your Canadian immigration application. Let us guide you 
                  through every step of the process.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="#assessment">
                    Get Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5000+</div>
                  <div className="text-sm text-gray-600">Successful Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            <HeroImage />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose CAimmigrat?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine expertise, experience, and personalized service to make your 
              Canadian immigration journey as smooth as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Immigration Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Immigration Programs We Handle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Express Entry to Family Sponsorship, we have expertise across 
              all major Canadian immigration programs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {immigrationPrograms.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Form Section */}
      <section id="assessment" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Get Your Free Immigration Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take the first step towards your Canadian dream. Our expert team will 
              evaluate your profile and provide personalized recommendations.
            </p>
          </div>

          <AssessmentForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Your Canadian Journey?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Don&apos;t let complex immigration processes hold you back. Our expert team 
              is here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Schedule Consultation
                  <Calendar className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Link href="tel:+14169927429">
                  Call Us Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}