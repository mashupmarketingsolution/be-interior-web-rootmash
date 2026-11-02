"use client";
import { CmsText, CmsImage, CmsTextarea, CmsLink, CmsSection } from "@/components/cms/Editable";
import Link from "next/link";
import { createLeadApi, leadErrorMessage } from "@/axios/axios";
import { CheckCircle2 } from "lucide-react";
import React, { ChangeEvent, FormEvent } from "react";
import imgOne from "@/logo/HomePage/Gemini_Generated_Image_Office1.png";
import { useState, useRef } from "react";
import { trackLead } from "@/components/Analytics/dataLayer";
import Image from "next/image";


interface FormType {
  name: string;
  email: string;
  phone: string;
  projectInfo: string;
}

type FormErrors = Partial<FormType>;

const HireForm = () => {
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
        trackLead("hire_architect", response.data.eventId);
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
    <CmsSection section="section-39bbb4c8a8d9"><section className="bg-ivory py-16 px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content & Illustration */}
        <div className="space-y-8">
          <h2 data-heading-tone="dark" className="text-4xl md:text-5xl font-serif text-[#283b33] leading-tight"><CmsText section="section-39bbb4c8a8d9" entryKey="heading-411654ff994f" fallback={"Leave us a message for your  dream interior"} original={<>
            Leave us a <span className="font-bold">message</span> for your{" "}
            <br />
            dream interior
          </>} /></h2>

          <div className="w-full h-80 flex items-center justify-center">
            <div className="w-full h-full relative bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              <CmsImage section="section-39bbb4c8a8d9"
                src={imgOne}
                alt="img"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                priority
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md mx-auto">
          {isSubmitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 flex items-start gap-3 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
              <p className="text-sm font-medium"><CmsText section="section-39bbb4c8a8d9" entryKey="text-468a2e6ff475" fallback={"Thank you! Your request has been received. Our team will contact you shortly."} /></p>
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
                      : "border-secondary focus:border-primary/40"
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
              <CmsTextarea section="section-39bbb4c8a8d9" aria-label="Project details" name="projectInfo"
                rows={4}
                placeholder="Project information (location, floor area, etc.)"
                value={formData.projectInfo}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 bg-white text-zinc-800 rounded-xl outline-none transition-all placeholder:text-zinc-400 font-medium text-sm sm:text-base resize-none border-2 leading-relaxed ${
                  errors.projectInfo
                    ? "border-red-500 bg-red-50/5 focus:bg-white"
                    : "border-secondary focus:border-primary/40"
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
              className="w-full py-4 mt-2 bg-white text-[#1b332a] font-extrabold text-sm sm:text-base tracking-wider rounded-xl shadow-md hover:bg-zinc-100 transition-all duration-200 cursor-pointer uppercase"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 mx-auto border-zinc-200 border-t-primary rounded-full animate-spin" />
              ) : (
                "Get Free Quote"
              )}
            </button>
          </form>

          <p className="text-[10px] text-gray-500 mt-4 leading-tight"><CmsText section="section-39bbb4c8a8d9" entryKey="text-ec0a66685be3" fallback={"By submitting this form, you agree to the "} /><br />
           <CmsLink section="section-39bbb4c8a8d9" entryKey="link-bebe8f4e0989" href="/privacy-policy" className="text-red-700 underline"><CmsText section="section-39bbb4c8a8d9" entryKey="text-7e0fd173bb59" fallback={"Privacy policy"} /></CmsLink>
            ,
            <CmsLink section="section-39bbb4c8a8d9" entryKey="link-367c44cef187" href="/terms" className="text-red-700 underline ml-1"><CmsText section="section-39bbb4c8a8d9" entryKey="text-59fd725a045c" fallback={"Terms and conditions"} /></CmsLink>
          </p>
        </div>
      </div>
    </section></CmsSection>
  );
};

export default HireForm;
