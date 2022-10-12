export default function Main({ children }: { children: React.ReactNode; }) {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "10px 20px", position: "relative", minHeight: "100vh" }}>
      {children}
    </div>
  );
};
