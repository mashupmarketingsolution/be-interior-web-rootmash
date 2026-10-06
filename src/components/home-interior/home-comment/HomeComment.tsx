"use client";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import formImg from "@/logo/HomePage/Gemini_Generated_Image_interior3.png";
import { createLeadApi, leadErrorMessage } from "@/axios/axios";
import { trackLead } from "@/components/Analytics/dataLayer";

interface FormType {
  name: string;
  email: string;
  phone: string;
  projectInfo: string;
}

type FormErrors = Partial<FormType>;

const HomeCommentForm = () => {
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

        trackLead("home_comment", response.data.eventId);

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
      setLoading(false)
    }
  };

  return (
    <div className="w-full px-4 md:px-12 py-12 md:py-16 lg:py-20 mx-auto my-16 sm:px-6 bg-ivory">
      <div className="flex flex-col-reverse lg:flex-row w-full bg-secondary rounded-3xl overflow-hidden shadow-2xl min-h-137.5 md:max-w-4xl lg:max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-zinc-800">
          <Image
            src={formImg}
            alt="Dream Kitchen Interior Design"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center font-poppins">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide font-montagu">
              Start Your Design Journey
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300/90 mt-2 font-light leading-relaxed">
              Let our design experts map out the perfect plan for your home.
            </p>
          </div>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl font-medium animate-fade-in">
              Thank you! Your request has been received. Our team will contact
              you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {submitError && <p role="alert" className="rounded-xl bg-red-50 text-red-800 p-4 text-sm">{submitError}</p>}
            {/* Input fields */}
            {[
              { name: "name", type: "text", placeholder: "Name" },
              { name: "email", type: "email", placeholder: "E-mail" },
              { name: "phone", type: "text", placeholder: "Phone" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col w-full">
                <input
                  aria-label={field.placeholder}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof FormType]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 bg-white text-zinc-800 rounded-xl outline-none transition-all placeholder:text-zinc-400 font-medium text-sm sm:text-base border-2 ${
                    errors[field.name as keyof FormType]
                      ? "border-red-500 bg-red-50/5 focus:bg-white"
                      : "border-transparent focus:border-primary/40"
                  }`}
                />
                {errors[field.name as keyof FormType] && (
                  <span className="text-red-400 text-xs mt-1.5 ml-1 font-medium">
                    {errors[field.name as keyof FormType]}
                  </span>
                )}
              </div>
            ))}

            {/* Textarea */}
            <div className="flex flex-col w-full">
              <textarea aria-label="Project details" name="projectInfo"
                rows={4}
                placeholder="Project information (location, floor area, etc.)"
                value={formData.projectInfo}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 bg-white text-zinc-800 rounded-xl outline-none transition-all placeholder:text-zinc-400 font-medium text-sm sm:text-base resize-none border-2 leading-relaxed ${
                  errors.projectInfo
                    ? "border-red-500 bg-red-50/5 focus:bg-white"
                    : "border-transparent focus:border-primary/40"
                }`}
              />
              {errors.projectInfo && (
                <span className="text-red-400 text-xs mt-1.5 ml-1 font-medium">
                  {errors.projectInfo}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-2 flex items-center justify-center bg-white text-[#111111] font-bold text-sm sm:text-base tracking-widest rounded-xl shadow-sm hover:bg-zinc-50 transition-all duration-300 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default HomeCommentForm;
