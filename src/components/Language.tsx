"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { Languages } from "lucide-react";
import { languageCookie, translate, type Language } from "@/lib/language";

const LanguageContext = createContext<Language>("en");
export function useLanguage() {
  return useContext(LanguageContext);
}
export function useTranslation() {
  const language = useLanguage();
  return (text: string, bangla?: string | null) => translate(language, text, bangla);
}
export function LocalizedText({ children }: { children: string }) {
  return useTranslation()(children);
}

function selectLanguage(language: Language) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${languageCookie}=${language}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  window.location.reload();
}

export function LanguageSwitch() {
  const next = useLanguage() === "bn" ? "en" : "bn";
  return (
    <button type="button" lang={next} onClick={() => selectLanguage(next)}
      aria-label={next === "bn" ? "বাংলা ভাষা বেছে নিন" : "Switch to English"}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/20 px-2.5 py-2 text-sm font-semibold text-white hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <Languages size={16} aria-hidden="true" /> {next === "bn" ? "বাংলা" : "EN"}
    </button>
  );
}

export function LanguageProvider({ initialLanguage, children }: { initialLanguage?: Language; children: ReactNode }) {
  const chooser = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = chooser.current;
    if (initialLanguage || window.parent !== window || !dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, [initialLanguage]);

  return (
    <LanguageContext.Provider value={initialLanguage ?? "en"}>
      {children}
      {!initialLanguage && (
        <dialog ref={chooser} onCancel={event => event.preventDefault()} aria-labelledby="language-title"
          className="fixed inset-0 m-auto w-[min(92vw,30rem)] rounded-3xl border border-white/15 bg-[#111111] p-7 text-white shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:p-9">
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-orange-300">BE INTERIOR</p>
          <h2 id="language-title" className="mb-2 text-2xl font-bold"><span lang="bn">ভাষা বেছে নিন</span><br />Choose your language</h2>
          <p className="mb-6 text-sm text-white/75"><span lang="bn">পরে মেনু থেকে ভাষা বদলাতে পারবেন।</span><br />You can change it anytime from the header.</p>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" lang="bn" onClick={() => selectLanguage("bn")} className="rounded-xl bg-[#e46e00] px-3 py-3 font-bold text-[#111111] hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">বাংলা</button>
            <button type="button" lang="en" onClick={() => selectLanguage("en")} className="rounded-xl border border-white/30 px-3 py-3 font-bold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">English</button>
          </div>
        </dialog>
      )}
    </LanguageContext.Provider>
  );
}
