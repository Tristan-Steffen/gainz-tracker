import { FormEvent } from "react";
import styles from "./Form.module.css";

type FormProps = { action: string; method?: string; children: React.ReactNode, title?: string, onSubmit?: (ev: FormEvent<HTMLFormElement>) => void }

export default function Form({ action, method = "post", children, onSubmit, title }: FormProps) {
  return (
    <form action={action} method={method} onSubmit={onSubmit} className={styles.wrapper}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </form>
  );
};
