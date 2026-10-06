"use client";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState, useRef } from "react";
import logo from "@/logo/HomePage/ContactImage.jpg";
import { createLeadApi, leadErrorMessage } from "@/axios/axios";
import { User, Mail, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { trackLead } from "@/components/Analytics/dataLayer";
interface FormType {
  name: string;
  email: string;
  phone: string;
  projectInfo: string;
}

type FormErrors = Partial<FormType>;

const ContactForm = () => {
  const [formData, setFormData] = useState<FormType>({
    name: "",
    email: "",
    phone: "",
    projectInfo: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormType]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;


    if (!formData.name.trim()) tempErrors.name = "Name is required";

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ""))) {
      tempErrors.phone = "Valid BD phone number required (e.g. 017xxxxxxxx)";
    }


    if (!formData.projectInfo.trim()) {
      tempErrors.projectInfo = "Project information is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || !validateForm()) return;
    submittingRef.current = true;

    setLoading(true);
    setSubmitError("");
    setIsSubmitted(false);
    try {
      if (validateForm()) {
        const response = await createLeadApi(formData);

        trackLead("contact_form", response.data.eventId);

        setIsSubmitted(true);

        setFormData({ name: "", email: "", phone: "", projectInfo: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error: unknown) {
      setSubmitError(leadErrorMessage(error));
      if (process.env.NODE_ENV === "development") {
        console.error("Form Submission Error");
      }
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <section className="bg-ivory py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Image & Branding */}
        <div className="relative w-full lg:w-5/12 h-64 lg:h-auto hidden md:block">
          <Image
            src={logo}
            alt="Interior Design Consultation"
            fill
            quality={100}
            className="object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent opacity-90"></div>

          <div className="absolute bottom-0 left-0 w-full p-10 text-white">
            <h3 className="font-montagu text-3xl font-bold mb-3 leading-tight">
              Let&apos;s craft your <br />{" "}
              <span className="text-primary">dream space</span>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Share your project details with us, and our expert architects will
              get back to you with a free consultation and quote.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16">
          <div className="mb-10">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl font-montagu font-bold text-[#111111]">
              Leave Us A Message
            </h2>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 flex items-start gap-3 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">
                Thank you! Your request has been received. Our team will contact
                you shortly.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {submitError && <p role="alert" className="rounded-xl bg-red-50 text-red-800 p-4 text-sm">{submitError}</p>}
            {/* Input fields */}
            {[
              {
                name: "name",
                type: "text",
                placeholder: "Your Full Name",
                icon: User,
              },
              {
                name: "email",
                type: "email",
                placeholder: "Email Address",
                icon: Mail,
              },
              {
                name: "phone",
                type: "text",
                placeholder: "Phone Number (e.g. 017...)",
                icon: Phone,
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col w-full relative">
                <div className="relative flex items-center group">
                  <field.icon
                    className={`absolute left-4 w-5 h-5 transition-colors duration-300 ${errors[field.name as keyof FormType] ? "text-red-400" : "text-zinc-400 group-focus-within:text-primary"}`}
                  />
                  <input
                  aria-label={field.placeholder}
                  type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof FormType]}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 bg-[#FAF5E9]/50 text-[#111111] rounded-xl outline-none transition-all placeholder:text-zinc-400 font-medium text-sm border-2 ${
                      errors[field.name as keyof FormType]
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-transparent focus:border-primary/40 focus:bg-white"
                    }`}
                  />
                </div>
                {errors[field.name as keyof FormType] && (
                  <span className="text-red-500 text-xs mt-1.5 ml-2 font-semibold">
                    {errors[field.name as keyof FormType]}
                  </span>
                )}
              </div>
            ))}

            {/* Textarea */}
            <div className="flex flex-col w-full">
              <textarea aria-label="Project details" name="projectInfo"
                rows={4}
                placeholder="Tell us about your project (location, floor area, style preferences, etc.)"
                value={formData.projectInfo}
                onChange={handleChange}
                className={`w-full px-5 py-4 bg-[#FAF5E9]/50 text-[#111111] rounded-xl outline-none transition-all placeholder:text-zinc-400 font-medium text-sm resize-none border-2 leading-relaxed ${
                  errors.projectInfo
                    ? "border-red-300 bg-red-50 focus:border-red-500"
                    : "border-transparent focus:border-primary/40 focus:bg-white"
                }`}
              />
              {errors.projectInfo && (
                <span className="text-red-500 text-xs mt-1.5 ml-2 font-semibold">
                  {errors.projectInfo}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitted}
              className="group w-full py-4 mt-4 bg-[#111111] text-white font-bold text-sm tracking-wider rounded-xl shadow-lg hover:bg-primary transition-all duration-300 cursor-pointer uppercase flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-zinc-200 border-t-primary rounded-full animate-spin" />
              ) : (
                "Get Free Quote"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
