export default function Form({ action, method = "post", children }: { action: string; method?: string; children: React.ReactNode }) {
  return (
    <form action={action} method={method} style={{ borderRadius: "5px", width: "min-content", border: "solid thin white", padding: "20px" }}>
      {children}
    </form>
  );
};
