export default function FooterManifesto() {
  return (
    <section
      className="bg-red flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: "100vh" }}
    >
      <p
        className="font-sans font-black text-paper leading-none"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 9rem)",
          letterSpacing: "-0.04em",
        }}
      >
        Built in Chicago.
      </p>
      <p
        className="font-sans font-black leading-none mt-3"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 9rem)",
          letterSpacing: "-0.04em",
          color: "rgba(237,232,222,0.72)",
        }}
      >
        For Chicago.
      </p>
    </section>
  );
}
