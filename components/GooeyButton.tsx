import { Children, cloneElement, ReactElement, TouchEvent, useMemo, useState } from 'react';
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
  let y = 70;

  const degrees = startAngle + ((endAngle - startAngle) / amount) * index;

  const radians = degrees * (Math.PI / 180);

  return { x: x * Math.cos(radians) - y * Math.sin(radians), y: x * Math.sin(radians) + y * Math.cos(radians), degrees, radians };

}

const angleTolerance = 30;
const { innerWidth = 100, innerHeight = 200 } = globalThis;
const lengthTolerance = innerWidth > innerHeight ? 50 : innerWidth / 2;


function GooeyButton(props: GooProps) {

  const children = useMemo(() => Children.toArray(props.children) as ReactElement[], [props.children]);

  const childProps = useMemo(() => children.map((_, i) => {
    const { x, y, radians, degrees } = calculatePos({ amount: children.length, index: i, startAngle: props.startAngle ?? 0, endAngle: props.endAngle ?? 360 })
    const style = { "--hx": (-x) + "px", "--hy": (-y) + "px" } as React.CSSProperties;
    return { style, x, y, radians, degrees, index: i };
  }), [children, props.endAngle, props.startAngle])

  const [downVec, setDownVec] = useState({ x: -1, y: -1, vx: 0, vy: 0 });

  const [dragHoveredIndex, setDragHoveredIndex] = useState(-1);

  function handleDragStart(ev: TouchEvent) {
    setDownVec({ ...downVec, x: ev.touches[0].clientX, y: ev.touches[0].clientY })
  }

  function handleTouchEnd() {
    if (dragHoveredIndex !== -1) {
      children[dragHoveredIndex].props.onClick();
    }
    setDownVec({ ...downVec, x: -1 });
  }

  function handleDrag(ev: TouchEvent) {
    setDownVec({ ...downVec, vx: downVec.x - ev.touches[0].clientX, vy: downVec.y - ev.touches[0].clientY });

    const angle = Math.atan2(downVec.vy, downVec.vx) * 180 / Math.PI - 90;

    const length = Math.sqrt(Math.pow(downVec.vx, 2) + Math.pow(downVec.vy, 2));
    let index = -1;

    if (length < 100 + lengthTolerance && length > 100 - lengthTolerance) {
      for (const c of childProps) {
        const isHovered = c.degrees - angleTolerance < angle && c.degrees + angleTolerance > angle;
        if (isHovered) {
          index = c.index;
        }
      }
    }

    if (index != dragHoveredIndex) {
      setDragHoveredIndex(index);
    }

  }

  function handleMainClick() {
    if (props?.onClick) {
      props.onClick();
    }
  }

  return (
    <div className={styles.wrapper} data-hovered={downVec.x !== -1} onTouchStart={handleDragStart}>
      <button className={styles["main-button"]} >+</button>

      {children.map((child, i) => {
        return <span key={i} className={styles["circle-content"]} style={childProps[i].style}>
          {cloneElement(child as ReactElement)}
        </span>
      })}

      <span style={{ opacity: 0.2 }}>
        <Goo>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle r="40" cx="50" cy="50" onClick={handleMainClick} onTouchEnd={handleTouchEnd} onTouchMove={handleDrag} ></circle>
            {children.map((child, i) => {
              return <circle
                key={i}
                onClick={child.props.onClick}
                className={`${styles["circle-small"]} ${dragHoveredIndex === i ? styles["hovered"] : ""}`}
                style={childProps[i].style} r="40" cx="50" cy="50" />
            })}
          </svg>
        </Goo>
      </span>

    </div>
  )
}

export default GooeyButton
