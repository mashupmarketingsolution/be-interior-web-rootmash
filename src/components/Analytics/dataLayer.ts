export type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    fbq?: (...args: unknown[]) => void;
  }
}

export const pushToDataLayer = (eventData: DataLayerEvent) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

export const trackWhatsAppClick = (location: string) => {
  if (typeof window === "undefined") {
    return;
  }

  // Google Tag Manager / dataLayer
  pushToDataLayer({
    event: "whatsapp_click",
    location,
  });

  // Meta Pixel custom event
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "WhatsAppClick", {
      location,
    });
  }
};
export const trackPhoneClick = (location: string) => {
  if (typeof window === "undefined") {
    return;
  }

  // Google Tag Manager / dataLayer
  pushToDataLayer({
    event: "phone_click",
    location,
  });

  // Meta Pixel custom event
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "PhoneClick", {
      location,
    });
  }
};
export const trackEmailClick = (location: string) => {
  if (typeof window === "undefined") {
    return;
  }

  // Google Tag Manager / dataLayer
  pushToDataLayer({
    event: "email_click",
    location,
  });

  // Meta Pixel custom event
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "EmailClick", {
      location,
    });
  }
};
const recordedLeads = new Set<string>();
export const trackLead = (source: string, eventId?: string) => {
  if (eventId && recordedLeads.has(eventId)) return;
  if (eventId) recordedLeads.add(eventId);
  if (typeof window === "undefined") {
    return;
  }

  pushToDataLayer({
    event: "generate_lead",
    lead_source: source,
    event_id: eventId,
  });

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      source,
    }, eventId ? { eventID: eventId } : undefined);
  }
};
