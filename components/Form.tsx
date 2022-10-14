import { FormEvent } from "react";

type FormProps = { action: string; method?: string; children: React.ReactNode, onSubmit?: (ev: FormEvent<HTMLFormElement>) => void }

export default function Form({ action, method = "post", children, onSubmit }: FormProps) {
  return (
    <form action={action} method={method} onSubmit={onSubmit} style={{ borderRadius: "5px", border: "solid thin white", padding: "20px" }}>
      {children}
    </form>
  );
};
