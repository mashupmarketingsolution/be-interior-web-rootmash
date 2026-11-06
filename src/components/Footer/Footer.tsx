"use client";
import { CmsText, CmsLink, CmsImage, CmsSection, useCmsList } from "@/components/cms/Editable";
import { useCms } from "@/components/cms/ContentProvider";
import NavLogo from "../Header/NavLogo";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
} from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { footerContactApi } from "@/axios/axios";
import logo from "@/logo/Gemini_Generated_Image_be-interior.png";
import {
  trackPhoneClick,
  trackEmailClick,
} from "@/components/Analytics/dataLayer";
interface FooterContactType {
  ms: number;
  query: string;
  result: {
    footercontactnumber1: string;
    footercontactnumber2: string;
    footercontactemail: string;
    footerlocation: string;
    links: {
      _key: string;
      _type: string;
      platformName: string;
      url: string;
    }[];
  }[];
  syncTags: string[];
}

const fetchFooterLinks = async () => {
  try {
    const res = await footerContactApi();
    if (res.status !== 200) {
      throw new Error("Error While Fetching");
    }
    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.log("Footer Err", (error instanceof Error ? error.message : "Unknown error"));
    }
    return;
  }
};

const Footer = () => {
  const contact = useCms().contact;
  const footer_services = useCmsList("section-784ee3257dd1","footer-services",[
                {
                  name: "Home Interior",
                  link: "/services/home-interior",
                },
                {
                  name: "Office Interior",
                  link: "/services/office-interior",
                },
                {
                  name: "Our Projects",
                  link: "/interior-projects",
                },
                {
                  name: "Interior Blogs",
                  link: "/blogs",
                },
              ]);
  const footer_resources = useCmsList("section-784ee3257dd1","footer-resources",[
                {
                  name: "Home",
                  link: "/",
                },
                {
                  name: "Calculator",
                  link: "/services/budget-calculator",
                },
                {
                  name: "About Us",
                  link: "/about",
                },
                {
                  name: "Contact",
                  link: "/contact",
                },
              ]);
  const { data, isLoading } = useQuery<FooterContactType>({
    queryKey: ["query-key"],
    queryFn: fetchFooterLinks,
  });

  const footerItems = contact ? [contact] : data?.result || [];
  // if (process.env.NODE_ENV === "development") {
  //   console.log("footer data", footerItems);
  // }
const footerNumberOne =
  footerItems[0]?.footercontactnumber1 || "01618995918";

const footerNumberTwo =
  footerItems[0]?.footercontactnumber2 || "01618995918";

const footerEmail =
  footerItems[0]?.footercontactemail || "beinteriorbd@gmail.com";
  const footerLocation = footerItems[0]?.footerlocation || "Dhaka, Bangladesh";

  const socialLinks = footerItems[0]?.links || [];

const getSocialLink = (platform: string) =>
  socialLinks.find(
    (item) => item.platformName?.toLowerCase() === platform.toLowerCase(),
  )?.url || "/";

const footerFB = getSocialLink("Facebook");
const footerInsta = getSocialLink("Instagram");
const footerLinkdIn = getSocialLink("LinkedIn");
const footerYT = getSocialLink("YouTube");

  return (
    <CmsSection section="section-784ee3257dd1"><footer className="relative w-full bg-secondary/90 text-white pt-12 pb-24 md:py-16 lg:py-20 overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-8 mb-10 lg:mb-16">
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-6">
              <NavLogo className="" />

              <p className="text-sm font-medium text-zinc-400 leading-relaxed max-w-xs"><CmsText section="section-784ee3257dd1" entryKey="text-27e1506c36d5" fallback={"Transforming your living spaces into masterpieces of comfort and style. Your vision is our expertise."} /></p>

              <div className="flex gap-4">
              {[
                { icon: <FaFacebookF size={14} />, label: "Facebook", link: footerFB },
                {
                  icon: <FaInstagram size={14} />, label: "Instagram",
                  link: footerInsta,
                },
                {
                  icon: <FaLinkedinIn size={14} />, label: "LinkedIn",
                  link: footerLinkdIn,
                },
                {
                  icon: <FaYoutube size={14} />, label: "YouTube",
                  link: footerYT,
                },
              ].filter((item) => item.link && item.link !== "/").map((Icon, i) => (
                <CmsLink section="section-784ee3257dd1"
                  key={i}
                  href={Icon.link}
                  aria-label={Icon.label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                >
                  {Icon.icon}
                </CmsLink>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-6">
            <h4 data-heading-tone="light" className="text-sm font-bold uppercase tracking-widest text-white"><CmsText section="section-784ee3257dd1" entryKey="heading-0d8759af8571" fallback={"Services"} original={<>
              Services
            </>} /></h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
              {footer_services.map((link) => (
                <CmsLink section="section-784ee3257dd1" key={link.name} href={link.link}>
                  <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group font-medium">
                    <span className="w-1 h-1 bg-zinc-600 group-hover:bg-primary rounded-full"></span>
                    <CmsText section="section-784ee3257dd1" fallback={link.name} />
                  </li>
                </CmsLink>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 data-heading-tone="light" className="text-sm font-bold uppercase tracking-widest text-white"><CmsText section="section-784ee3257dd1" entryKey="heading-b12fb6f4bdb0" fallback={"Resources"} original={<>
              Resources
            </>} /></h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
              {footer_resources.map((link) => (
                <CmsLink section="section-784ee3257dd1" key={link.name} href={link.link}>
                  <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group font-medium">
                    <span className="w-1 h-1 bg-zinc-600 group-hover:bg-primary rounded-full"></span>
                    <CmsText section="section-784ee3257dd1" fallback={link.name} />
                  </li>
                </CmsLink>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <h4 data-heading-tone="light" className="text-sm font-bold uppercase tracking-widest text-white"><CmsText section="section-784ee3257dd1" entryKey="heading-22302787c2fd" fallback={"Contact"} original={<>
              Contact
            </>} /></h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-400">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-primary mt-1" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${footerNumberOne}`}
                    onClick={() => trackPhoneClick("footer_phone_1")}
                    className="hover:text-white transition-colors"
                  >
                    {isLoading ? "..." : footerNumberOne}
                  </a>
                  <a
                    href={`tel:${footerNumberTwo}`}
                    onClick={() => trackPhoneClick("footer_phone_2")}
                    className="hover:text-white transition-colors"
                  >
                    {isLoading ? "..." : footerNumberTwo}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a
                  href={`mailto:${footerEmail}`}
                  onClick={() => trackEmailClick("footer_email")}
                  className="hover:text-white transition-colors min-w-0 [overflow-wrap:anywhere]"
                >
                  {isLoading ? "..." : `${footerEmail}`}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiMapPin className="text-lg text-primary mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  {isLoading ? "..." : `${footerLocation}`}
                  {contact?.openingHours && <span className="block mt-3 text-sm">{contact.openingHours}</span>}
                </p>
              </li>
            </ul>
          </div>
          {/* Column 4: footer page */}
          <div className="flex flex-col gap-6">
            <h4 data-heading-tone="light" className="text-sm font-bold uppercase tracking-widest text-white"><CmsText section="section-784ee3257dd1" entryKey="heading-1a1b4c5699be" fallback={"Our Facebook page"} original={<>
              Our Facebook page
            </>} /></h4>

            <CmsLink section="section-784ee3257dd1"
              href={footerFB}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border relative max-w-3xl w-full h-48 bg-zinc-900 overflow-hidden border-[#111111]/5 shadow-sm rounded-2xl transition-all duration-500 hover:shadow-md hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white text-zinc-400 text-sm gap-2">
                  <div className="w-4 h-4 border-2 border-zinc-300 border-t-primary rounded-full animate-spin"></div><CmsText section="section-784ee3257dd1" entryKey="text-4e761c6be47b" fallback={"loading page..."} /></div>
              ) : (
                <>
                  <CmsImage section="section-784ee3257dd1"
                    src={logo}
                    alt="BE INTERIOR Facebook Page"
                    fill
                    quality={100}
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 mix-blend-overlay"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between  to-transparent z-10">
                    <div className="flex justify-end">
                      <span className="p-2.5 bg-white/10 backdrop-blur-md text-white rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <FaFacebook className="w-5 h-5" />
                      </span>
                    </div>

                    <div>
                      <p className="text-white text-xl font-montagu font-bold tracking-wide"><CmsText section="section-784ee3257dd1" entryKey="text-18b2eac97caf" fallback={"BE INTERIOR"} /></p>
                      <p className="text-zinc-300 text-xs tracking-wider uppercase mt-1"><CmsText section="section-784ee3257dd1" entryKey="text-6b9ccdfe1819" fallback={"Join Our Community on Facebook →"} /></p>
                    </div>
                  </div>
                </>
              )}
            </CmsLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center text-xs md:text-left text-zinc-500">
          <p>© {new Date().getFullYear()}<CmsText section="section-784ee3257dd1" entryKey="text-4c384b9fdcb0" fallback={" BE INTERIOR. All Rights Reserved."} /></p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <CmsLink section="section-784ee3257dd1" entryKey="link-64f33c59cc80"
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            ><CmsText section="section-784ee3257dd1" entryKey="text-f72389a2e333" fallback={"Privacy policy"} /></CmsLink>
            <CmsLink section="section-784ee3257dd1" entryKey="link-541434030328" href="/terms" className="hover:text-white transition-colors"><CmsText section="section-784ee3257dd1" entryKey="text-df39f7a68427" fallback={"Terms of service"} /></CmsLink>
          </div>
        </div>
      </div>
    </footer></CmsSection>
  );
};

export default Footer;
