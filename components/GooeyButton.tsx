import Router from 'next/router';
import { Children } from 'react';
import Goo from './Goo';
import styles from "./GooeyButton.module.css";


type GooProps = {
  startAngle?: number;
  endAngle?: number;
  onClick?: () => void;
  children: React.ReactNode
}

function calculatePos({ startAngle, endAngle, index, amount }: { startAngle: number; endAngle: number; index: number; amount: number; }) {
  let x = 0;
  let y = 50;

  const degrees = startAngle + ((endAngle - startAngle) / amount) * index;

  const radians = degrees * (Math.PI / 180);

  return { x: x * Math.cos(radians) - y * Math.sin(radians), y: x * Math.sin(radians) + y * Math.cos(radians) };

}

function GooeyButton(props: GooProps) {

  const children = Children.toArray(props.children);

  return (
    <div className={styles.wrapper}>
      <button className={styles["main-button"]} onClick={props.onClick}>+</button>
      <Goo>
        <svg className={styles.svg} width="100%" height="100%" viewBox="0 0 100 100">
          <circle r="50" cx="50" cy="50"></circle>
          {children.map((_, i) => {
            const { x, y } = calculatePos({ amount: children.length, index: i, startAngle: props.startAngle ?? 0, endAngle: props.endAngle ?? 360 })
            const style = { "--hx": (50 - x) + "px", "--hy": (50 - y) + "px" } as React.CSSProperties;
            return <circle key={i} className={styles["circle-small"]} style={style} r="20" cx="50" cy="50" onClick={() => Router.push("/add/sleep")} />
          })}
        </svg>
      </Goo>
    </div>
  )
}

export default GooeyButton
