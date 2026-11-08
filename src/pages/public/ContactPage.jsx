import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Scissors,
  Layers,
  Send,
  CheckCircle,
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { BRAND_INFO } from '../../constants/navigation';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'tailoring', // 'tailoring' | 'fabric' | 'both'
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end capture ready for future Firebase submission
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Header Banner */}
      <section
        id="contact-hero"
        className="bg-gradient-to-b from-cream to-ivory border-b border-cream-border py-14 md:py-20 text-center scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="maroon" size="sm" className="mb-4">
            Visit & Connect
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-chocolate-900 tracking-tight">
            Contact & Location Details
          </h1>
          <p className="mt-4 text-base sm:text-lg text-chocolate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Schedule a private bespoke measurement session or visit our textile archive to inspect fabric varieties.
          </p>
        </div>
      </section>

      {/* Dual Shop Contact Cards */}
      <section
        id="locations"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shop 1: Tailoring Home Contact Card */}
          <div className="bg-white p-8 rounded-sm border-2 border-maroon-100 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-sm bg-maroon-800 text-gold flex items-center justify-center">
                  <Scissors className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-chocolate-900">
                    Tailoring Home
                  </h3>
                  <p className="text-xs text-maroon-700 font-semibold uppercase tracking-wider">
                    Stitching & Tailoring Services
                  </p>
                </div>
              </div>
              <Badge variant="maroon" size="xs">
                Appointments
              </Badge>
            </div>

            <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
              Contact our master tailors for suit fittings, bridal/groom tailoring, bespoke consultations, and alterations.
            </p>

            <div className="space-y-3 pt-3 border-t border-cream-border text-xs sm:text-sm text-chocolate-800">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Phone & WhatsApp:</span>
                  <a href={`tel:${BRAND_INFO.tailoringShop.phone.replace(/\s+/g, '')}`} className="hover:text-maroon-700">
                    {BRAND_INFO.tailoringShop.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Address:</span>
                  <span>{BRAND_INFO.tailoringShop.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Visiting Hours:</span>
                  <span>{BRAND_INFO.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shop 2: Fabric Home Contact Card */}
          <div className="bg-white p-8 rounded-sm border-2 border-chocolate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-sm bg-chocolate-800 text-gold flex items-center justify-center">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-chocolate-900">
                    Fabric Home
                  </h3>
                  <p className="text-xs text-chocolate-700 font-semibold uppercase tracking-wider">
                    Textile & Fabric Varieties
                  </p>
                </div>
              </div>
              <Badge variant="chocolate" size="xs">
                Walk-ins Welcome
              </Badge>
            </div>

            <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
              Visit our fabric showroom to inspect silk, linen, cotton, and wool swatches, or inquire about custom yardage.
            </p>

            <div className="space-y-3 pt-3 border-t border-cream-border text-xs sm:text-sm text-chocolate-800">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-chocolate-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Phone & WhatsApp:</span>
                  <a href={`tel:${BRAND_INFO.fabricShop.phone.replace(/\s+/g, '')}`} className="hover:text-chocolate-900">
                    {BRAND_INFO.fabricShop.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-chocolate-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Address:</span>
                  <span>{BRAND_INFO.fabricShop.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-chocolate-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Visiting Hours:</span>
                  <span>{BRAND_INFO.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Enquiry Form */}
      <section
        id="enquiry-form"
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="bg-white p-8 sm:p-10 rounded-sm border border-cream-border shadow-md">
          <SectionHeading
            eyebrow="Direct Message"
            title="Book a Consultation or Inquire"
            subtitle="Let us know your requirements. Our master tailor or textile curator will get back to you promptly."
            align="left"
          />

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-6 text-center space-y-3">
              <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-emerald-900">
                Enquiry Recorded Successfully
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 font-sans">
                Thank you for reaching out to Tailoring Home & Fabric Home. Our team will contact you within business hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-chocolate-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-chocolate-200 text-sm focus:outline-hidden focus:border-maroon-700 bg-ivory/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-chocolate-700 mb-1.5">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-chocolate-200 text-sm focus:outline-hidden focus:border-maroon-700 bg-ivory/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-chocolate-700 mb-1.5">
                  I am interested in:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'tailoring', label: 'Tailoring Home' },
                    { id: 'fabric', label: 'Fabric Home' },
                    { id: 'both', label: 'Both Boutiques' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, interest: opt.id })}
                      className={`py-2 px-3 rounded-sm border font-medium text-center transition-all ${
                        formData.interest === opt.id
                          ? 'bg-maroon-800 text-ivory border-maroon-800'
                          : 'bg-white text-chocolate-700 border-chocolate-200 hover:bg-cream-soft'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-chocolate-700 mb-1.5">
                  Tell Us About Your Requirement
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Inquiring about a three-piece suit for a December wedding and pure Banarasi silk swatches."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-chocolate-200 text-sm focus:outline-hidden focus:border-maroon-700 bg-ivory/50"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                icon={Send}
              >
                Submit Consultation Request
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
