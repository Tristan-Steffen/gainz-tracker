import Goo from 'gooey-react'
import styles from "./GooeyButton.module.css"

function GooeyButton() {

  return (
    <div className={styles.wrapper}>
      <button className={styles.plus}>+</button>
      <Goo>
        <svg className={styles.svg} width="100%" height="100%" viewBox="0 0 100 100">
          <circle className="c-0" r="20" cx="80" cy="80" />
          <circle className={styles.c1} r="20" cx="80" cy="80" />
          <circle className={styles.c2} r="20" cx="80" cy="80" />
          <circle className={styles.c3} r="20" cx="80" cy="80" />
        </svg>
      </Goo>
    </div>
  )
}

export default GooeyButton
