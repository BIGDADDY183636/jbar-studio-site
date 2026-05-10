import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1714",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle red ambient hint — top right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(176,69,69,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontWeight: 900,
            fontSize: 40,
            color: "#b04545",
            letterSpacing: "-2px",
            marginBottom: 52,
            lineHeight: 1,
          }}
        >
          JBAR
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontWeight: 900,
            fontSize: 72,
            color: "#ede8de",
            letterSpacing: "-3px",
            lineHeight: 1.02,
            maxWidth: 900,
            marginBottom: 52,
          }}
        >
          Custom websites for Chicago&apos;s independent businesses.
        </div>

        {/* Pricing line */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 20,
            color: "#b04545",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          $400 · Built in a week · Live forever
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 96,
            right: 96,
            height: 1,
            background: "rgba(237,232,222,0.07)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
