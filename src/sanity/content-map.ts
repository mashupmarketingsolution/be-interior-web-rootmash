import defaults from "../content/default-content.json";
export const pageNames: Record<string,string> = {
 "/":"Home / প্রথম পাতা", "/about":"About / আমাদের সম্পর্কে", "/contact":"Contact / যোগাযোগ", "/blogs":"Blogs / লেখা",
 "/hire-architect":"Hire architect / পরামর্শ বুকিং", "/interior-projects":"Projects / কাজের ছবি",
 "/services/home-interior":"Home interior / বাসার ইন্টেরিয়র", "/services/office-interior":"Office interior / অফিসের ইন্টেরিয়র",
 "/services/budget-calculator":"Budget calculator / খরচের হিসাব", "/privacy-policy":"Privacy policy", "/terms":"Terms / শর্তাবলি", "/refund-policy":"Refund policy"
};
const names:Record<string,[string,string]> = {
 "section-d036fe38185d":["উপরের ব্যানার / Hero slider","Homepage-এর একেবারে উপরের বড় ছবি, লেখা ও button।"],
 "section-895eb710140e":["সেবার কার্ড / Services","Homepage-এর Home ও Office interior-এর ছবি ও কার্ড।"],
 "section-b90b0c348627":["কাজের ধাপ / Workflow","পরামর্শ থেকে handover পর্যন্ত কাজের ধাপগুলো।"],
 "section-994fa32343da":["কেন আমাদের বেছে নেবেন","Homepage-এর সুবিধা ও প্রতিশ্রুতির অংশ।"],
 "section-37b8a2c22aa5":["বাসার কাজের ছবি / Home projects","এখানের heading বদলান। Project-এর ছবি ও তথ্য Projects তালিকা থেকে বদলাবেন।"],
 "section-8ac0a3caab4b":["খরচ হিসাবের আমন্ত্রণ","‘Invest in your ideal space’ লেখা ও calculator button-এর অংশ।"],
 "section-39381f4c733d":["অফিসের কাজের ছবি / Office projects","এখানের heading বদলান। Project-এর ছবি ও তথ্য Projects তালিকা থেকে বদলাবেন।"],
 "section-8829bda372d5":["আমাদের সঙ্গে তুলনা / Comparison","BE Interior ও অন্যদের সুবিধার তুলনার তালিকা।"],
 "section-6bda2feda9af":["গ্রাহকের মতামত / Reviews","‘Trusted by visionaries’ heading। গ্রাহকের review বদলাতে Reviews তালিকায় যান।"],
 "section-adb0c734da06":["WhatsApp-এ যোগাযোগের আমন্ত্রণ","Homepage-এর নিচের ‘Your dream interior’ অংশ ও যোগাযোগ button।"],
 "section-4d67118a0e1e":["উপরের ব্যানার / Hero slider","Home interior পেজের উপরের বড় ছবি, লেখা ও button।"],
 "section-8c426c953f30":["কাজের পদ্ধতি / Process","Home interior সেবার কাজের পদ্ধতির অংশ।"],
 "section-bef92f830c4e":["Home package-এর অংশ","এই অংশের heading ও button-এর লেখা। Package-এর নাম, features ও দাম Packages থেকে বদলাবেন।"],
 "section-0fb53cd24278":["WhatsApp-এ কথা বলার আমন্ত্রণ","Home interior পেজের যোগাযোগের অংশ।"],
 "section-7d2161405ba7":["বাসার কাজের ছবি / Projects","এই অংশের লেখা এখানে; project-এর ছবি ও তথ্য Projects তালিকায়।"],
 "section-64ef308122c5":["আমাদের প্রতিশ্রুতি / Promises","Home interior সেবার সুবিধা ও প্রতিশ্রুতি।"],
 "section-b308599ab361":["গ্রাহকের মতামত / Reviews","এই অংশের heading এখানে; review-এর বিস্তারিত Reviews তালিকায়।"],
 "section-f0e0d8d7c3c1":["যোগাযোগের ফর্ম / Enquiry form","Home interior পেজের ফর্মের heading, ছবি ও label।"],
 "section-ada934298a1e":["উপরের ব্যানার / Hero slider","Office interior পেজের উপরের বড় ছবি, লেখা ও button।"],
 "section-8abdd6e09c4b":["অফিসের সেবাগুলো / Services","Office interior পেজের সেবার তালিকা।"],
 "section-0173da3c8617":["আমাদের প্রতিশ্রুতি / Promises","Office interior পেজের সুবিধার সংক্ষিপ্ত তালিকা।"],
 "section-1cef778566e8":["Office package-এর অংশ","এই অংশের heading ও button-এর লেখা। Package-এর দাম, features ও ছবি Packages থেকে বদলাবেন।"],
 "section-03eac0d150b1":["কাজের ধাপ / Process","Office interior কাজের পদ্ধতি ও প্রতিশ্রুতির বিস্তারিত।"],
 "section-11179bfeccff":["অফিসের কাজের ছবি / Projects","এই অংশের লেখা এখানে; project-এর ছবি ও তথ্য Projects তালিকায়।"],
 "section-c4c19a2b7607":["গ্রাহকের মতামত / Reviews","এই অংশের heading এখানে; review-এর বিস্তারিত Reviews তালিকায়।"],
 "section-e1663bf0af5e":["যোগাযোগের ফর্ম / Enquiry form","Office interior ফর্মের heading, ছবি ও label।"],
 "section-f1fb928664c4":["প্রতিষ্ঠাতার পরিচয় / Founder","About পেজের প্রতিষ্ঠাতার ছবি, নাম ও পরিচিতি।"],
 "section-c335e81ccd1b":["আমাদের গল্প / Company story","About পেজের প্রতিষ্ঠানের গল্প ও পরিচিতি।"],
 "section-16c0083fc386":["টিম পরিচিতির অংশ","এই অংশের লেখা এখানে; সদস্যদের তথ্য Team তালিকায়।"],
 "section-08e64b4ac0a4":["যোগাযোগের পরিচিতি","Contact পেজের শুরুতে ছবি ও লেখা। Phone/email সাধারণ সেটিংস থেকে বদলাবেন।"],
 "section-b6bcd931a809":["ঠিকানা ও মানচিত্র / Location","এই অংশের লেখা এখানে। ঠিকানা সাধারণ সেটিংসের Contact information-এ বদলাবেন।"],
 "section-63787ee750fd":["যোগাযোগের ফর্ম / Enquiry form","Contact পেজের ফর্মের heading, ছবি ও label।"],
 "section-39bbb4c8a8d9":["বুকিং ফর্ম / Booking form","Hire architect পেজের ফর্মের heading, ছবি ও label।"],
 "section-e7c2c0e3c691":["পরামর্শের আমন্ত্রণ","Hire architect পেজের যোগাযোগের অংশ।"],
 "section-5fb9f68eddec":["বিশেষ সেবার পরিচিতি","সেবার পরিচিতি ও বিস্তারিত।"],
 "section-89892e803d65":["উপরের পরিচিতি / Blog banner","Blogs পেজের উপরের heading ও পরিচিতি।"],
 "section-720af0ba771b":["Blog তালিকার অংশ","এই অংশের লেখা এখানে; blog লিখতে Blogs তালিকা ব্যবহার করুন।"],
 "section-31892f5d6fc3":["Project তালিকার অংশ","এই অংশের লেখা এখানে; project-এর ছবি ও তথ্য Projects তালিকায়।"],
 "section-0808fc405263":["হিসাবের ফর্ম / Calculator","Calculator-এর লেখা, label ও ছবি। দাম ও হিসাবের নিয়ম Packages / Site Settings-এ।"],
 "section-ca3a3a105e62":["Privacy policy-এর লেখা","Privacy policy পেজের লেখা।"],
 "section-02902e7dadb4":["Terms-এর লেখা","শর্তাবলির পেজের লেখা।"],
 "section-fcf319c9ba82":["Refund policy-এর লেখা","Cancellation ও refund policy-এর লেখা।"],
 "section-784ee3257dd1":["Footer / পেজের একেবারে নিচের অংশ","সব পেজের নিচের পরিচিতি, link তালিকা ও Facebook-এর ছবি। Logo এবং যোগাযোগের তথ্য সাধারণ সেটিংসের আলাদা জায়গায়।"],
 "section-7907e92a6df3":["সব পেজের নিচের আমন্ত্রণ / CTA","Footer-এর আগে ‘Ready to transform?’ অংশ; এটি বদলালে সব পেজে বদলাবে।"],
 "section-aeb845e27560":["মোবাইলের নিচের menu","মোবাইলে Booking, Calculator ও Call-এর নাম ও link।"],
 "section-afe2ab55e2bf":["Office clients পরিচিতি","Office client section-এর লেখা।"]
};
export type SectionField = "texts"|"slides"|"images"|"links"|"lists";
export type EditorDocument = {_id?:string;[key:string]:unknown};
export function sectionInfo(id?:string){const clean=id?.replace(/^drafts\./,"");const original=defaults.sections.find(s=>s._id===clean);const pair=clean?names[clean]:undefined;return {id:clean,title:pair?.[0]||original?.title||"পেজের অংশ",description:pair?.[1]||"এই অংশের লেখা ও ছবি বদলান।",path:original?.previewPath||"/",original};}
export function sectionHas(document:EditorDocument|undefined,field:SectionField){const original=sectionInfo(document?._id).original as unknown as Record<string,unknown>|undefined;return (Array.isArray(original?.[field])&&original[field].length>0)||(Array.isArray(document?.[field])&&document[field].length>0);}
export function sectionLocations(id?:string){const clean=id?.replace(/^drafts\./,"");return defaults.pages.filter(p=>p.sections.some(s=>s.section._ref===clean)).map(p=>({title:pageNames[p.path]||p.title,path:p.path}));}
export const sharedSections=["section-784ee3257dd1","section-7907e92a6df3","section-aeb845e27560"];
