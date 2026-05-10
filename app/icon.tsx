import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1714",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 900,
            fontSize: 22,
            color: "#b04545",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          J
        </span>
      </div>
    ),
    { ...size }
  );
}
