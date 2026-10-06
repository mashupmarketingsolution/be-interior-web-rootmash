import { ImageResponse } from "next/og";
export const alt = "BE Interior — Home and Office Interior Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
 return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "#111111", color: "#ffffff", borderLeft: "24px solid #e77900" }}><div style={{ fontSize: 72, color: "#e77900", fontWeight: 700 }}>BE INTERIOR</div><div style={{ fontSize: 42, marginTop: 32 }}>Home & Office Interior Design</div><div style={{ fontSize: 28, marginTop: 48, color: "#cccccc" }}>Dhaka, Bangladesh · beinterior.com.bd</div></div>, size);
}
