export default function FooterManifesto() {
  return (
    <section
      className="bg-red flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: "100vh" }}
    >
      <p
        className="font-display font-bold text-paper leading-none"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 9rem)",
        }}
      >
        Built in Chicago.
      </p>
      <p
        className="font-display font-bold leading-none mt-3"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 9rem)",
          color: "rgba(244,241,234,0.72)",
        }}
      >
        For Chicago.
      </p>
    </section>
  );
}
