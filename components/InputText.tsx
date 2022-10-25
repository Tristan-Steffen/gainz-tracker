import styles from "./InputText.module.css"
export default function InputText(props: { type: string, label?: string, icon?: string, name: string, onChange?: (arg0: string) => void }) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} placeholder={" "} id={props.name} type={props.type} name={props.name} onChange={e => props.onChange?.(e.target.value)} />
      <label className={styles.label} htmlFor={props.name}>{props.label || props.name}</label>
    </div>
  )
}
