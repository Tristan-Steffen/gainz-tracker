import Router from 'next/router'
import Goo from './Goo'
import styles from "./GooeyButton.module.css"

function GooeyButton() {

  return (
    <div className={styles.wrapper}>
      <button className={styles.plus} onClick={() => Router.push("/add")}>+</button>
      <Goo>
        <svg className={styles.svg} width="100%" height="100%" viewBox="0 0 100 100">
          <circle className="c-0" r="20" cx="80" cy="80" />
          <circle className={styles.c1} r="20" cx="80" cy="80" onClick={() => Router.push("/add/sleep")} />
          <circle className={styles.c2} r="20" cx="80" cy="80" onClick={() => Router.push("/add/weight")} />
          <circle className={styles.c3} r="20" cx="80" cy="80" onClick={() => Router.push("/add/gym")} />
        </svg>
      </Goo>
    </div>
  )
}

export default GooeyButton
