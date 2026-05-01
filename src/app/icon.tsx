import { ImageResponse } from "next/og";
import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  let logoUrl = "";

  try {
    await dbConnect();
    const logoSetting = await Setting.findOne({ key: "logo" });
    if (logoSetting?.value?.url) {
      logoUrl = logoSetting.value.url;
    }
  } catch (e) {
    // fallback to empty
  }

  if (logoUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "white",
            borderRadius: "12px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt="Logo"
            width={56}
            height={56}
            style={{ objectFit: "contain" }}
          />
        </div>
      ),
      { ...size }
    );
  }

  // Fallback: render text-based icon
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #00AEEF 0%, #0077B6 100%)",
          borderRadius: "12px",
          color: "white",
          fontSize: "36px",
          fontWeight: 900,
          letterSpacing: "-2px",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
