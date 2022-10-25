import { useState } from "react";
import styles from "./InputNumber.module.css";

export const InputNumber = (props: { onChange: (number) => void }) => {

  const [value, setValue] = useState(0);

  return (
    <div className={styles.wrapper}>
      {value}
    </div>
  )
}
