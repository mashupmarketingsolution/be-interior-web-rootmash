# BE Interior — Admin ব্যবহারের নির্দেশনা

Admin: https://web.beinterior.com.bd/beinterior/studio

## প্রতিদিনের পরিবর্তন

| কী বদলাবেন | Admin-এর কোথায় |
| --- | --- |
| Logo, favicon | Content → Site Settings → Logo & favicon |
| Font, button/active-menu রং, heading রং | Site Settings → Appearance |
| Menu নাম, link, dropdown, অবস্থান | Site Settings → Navigation |
| Office হিসাবের multiplier | Site Settings → Office calculation rules |
| নির্দিষ্ট সময়ের offer/message | Site Settings → Announcement / offer |
| পেজের SEO, section-এর ক্রম, FAQ, gallery | Pages — text, sections & SEO |
| Hero slide, লেখা, ছবি, button | Pages-এর section reference খুলুন; অথবা Designed sections |
| Footer link যোগ/লুকানো/সাজানো | Designed sections → Footer → Cards & lists |
| Phone, email, address, social link, opening hours, WhatsApp greeting | Website Settings |
| Home package-এর room price/furniture/accessories | Package Type |
| Office package-এর rate/description/inclusions/add-ons | Office Package Type |
| Package card-এর features, ছবি, highlight | সংশ্লিষ্ট Package Type → Website package fields |
| Project/review/team দেখানো, লুকানো, order | সংশ্লিষ্ট document-এর Show on website / Display order |
| Lead status, দায়িত্ব, follow-up, notes | Leads; enquiries auto-save হয়, Publish করবেন না |
| Lead filter এবং CSV | উপরের Enquiries tab |

## লেখা/ছবি বদলানো

1. Content → Pages থেকে পেজ খুলুন।
2. Page sections-এর যে অংশ বদলাবেন সেটি খুলে Designed section reference-এ যান।
3. Text, Hero slides, Images, Buttons & links অথবা Cards & lists tab ব্যবহার করুন।
4. Preview tab-এ draft দেখুন। Preview-তে enquiry জমা হয় না।
5. ঠিক থাকলে Publish করুন। Website refresh করুন; স্বয়ংক্রিয় update সাধারণত এক মিনিটের মধ্যে আসে।

নতুন ছবি upload করার সময় ছবির বর্ণনা দিন। Logo-এর জন্য কম ফাঁকা জায়গাসহ transparent PNG/WebP, favicon-এর জন্য square PNG ব্যবহার করুন।

## নতুন পেজ / FAQ / gallery

Pages থেকে Create করে পেজের নাম ও address (যেমন /our-story) দিন। Page sections-এ Text, Questions & answers, Image gallery, Button / call to action বা existing designed section যোগ করুন। Drag করে সাজান। Publish করুন। Menu-তে সেই address Custom link হিসেবে বসান। Blogs এবং project-এর detail address তাদের নিজস্ব document থেকে পরিচালিত হবে।

## Menu ফিরিয়ে আনা

Delete করার বদলে Show in menu বন্ধ করুন। পরে একই switch চালু করলে নাম ও link-সহ ফিরে আসবে। Restore default menu দিয়ে প্রথম menu draft হিসেবে ফেরানো যায়; এরপর Publish করুন। নতুন পেজের address Pages document-এ পাওয়া যাবে।

## Section ফিরিয়ে আনা

Page বা section-এর document actions menu থেকে Restore original section order/content ব্যবহার করুন। এটি draft তৈরি করে; Preview করে তারপর Publish করুন। কোনো section সাময়িক সরাতে Show on website বন্ধ করুন। Page-এর section list খালি করলে পেজের section content খালি থাকবে; order restore করলে পুরোনো বিন্যাস ফিরবে।

## দাম ও হিসাব

Office card ও calculator একই Office Package Type-এর Rate Per Sft ব্যবহার করে। আগের card-এর আলাদা static price range আর authoritative নয়। Scope অনুযায়ী Site Settings-এর multiplier প্রয়োগ হয়। Home calculator সংশ্লিষ্ট Package Type-এর room/item prices ব্যবহার করে। Package-এর নাম বদলালে package-নির্ভর estimates-ও যাচাই করুন।

## নিরাপদ ব্যবহার

Lead এবং internal notes শুধু authenticated Admin-এর জন্য। CSV-তে ব্যক্তিগত enquiry থাকে; নিজের team-এর মধ্যে রাখুন। Website-এর draft preview-তে form submission বন্ধ থাকে। Site Settings-এর বর্তমান logo/favicon/menu migration-এ অক্ষত রাখা হয়েছে।

## Local copy

Start Local Website.cmd চালান, তারপর http://localhost:3000 খুলুন। প্রথমবার dependencies install হতে সময় লাগতে পারে। Source পরিবর্তন করলে development server refresh করে। Admin খুলতে Start Admin.cmd ব্যবহার করতে পারেন। Local এবং staging একই Sanity dataset ব্যবহার করলে Admin-এর Publish দুটোতেই প্রযোজ্য হবে।

Local preview-তে public CMS content ব্যবহার করা হয়। Local form দিয়ে enquiry জমা দিতে private server configuration আলাদাভাবে প্রয়োজন; সেটি GitHub/source backup-এ রাখা হয়নি। প্রকাশিত staging website-এর enquiry স্বাভাবিক server configuration ব্যবহার করে।

সাধারণ লেখা, ছবি, menu, section, পেজ, package ও follow-up-এর জন্য code লাগবে না। সম্পূর্ণ নতুন ধরনের feature বা নতুন বিশেষ layout বানাতে development লাগবে।
