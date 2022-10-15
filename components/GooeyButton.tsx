import { Children, cloneElement, ReactElement, TouchEvent, useState } from 'react';
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

function GooeyButton(props: GooProps) {

  const children = Children.toArray(props.children) as ReactElement[];

  const childProps = children.map((_, i) => {
    const { x, y, radians, degrees } = calculatePos({ amount: children.length, index: i, startAngle: props.startAngle ?? 0, endAngle: props.endAngle ?? 360 })
    const style = { "--hx": (50 - x) + "px", "--hy": (50 - y) + "px" } as React.CSSProperties;
    return { style, x, y, radians, degrees, index: i };
  })

  const [downVec, setDownVec] = useState({ x: 0, y: 0, vx: 0, vy: 0 });

  const [dragHoveredIndex, setDragHoveredIndex] = useState(-1);

  function handleDragStart(ev: TouchEvent) {
    setDownVec({ ...downVec, x: ev.touches[0].clientX, y: ev.touches[0].clientY })
  }

  function handleTouchEnd() {
    if (dragHoveredIndex !== -1) {
      children[dragHoveredIndex].props.onClick();
    }
  }

  function handleDrag(ev: TouchEvent) {
    setDownVec({ ...downVec, vx: downVec.x - ev.touches[0].clientX, vy: downVec.y - ev.touches[0].clientY });

    let angle = Math.atan2(downVec.vy, downVec.vx) * 180 / Math.PI;
    if (angle < 0) {
      angle = 360 + angle;
    }

    angle = (angle - 90) % 360;

    const tolerance = 30;
    const length = Math.sqrt(Math.pow(downVec.vx, 2) + Math.pow(downVec.vy, 2));
    let index = -1;

    if (length < 100 + tolerance && length > 10 + tolerance) {
      for (const c of childProps) {
        const isHovered = c.degrees - tolerance < angle && c.degrees + tolerance > angle;
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
    <div className={styles.wrapper}>
      <button className={styles["main-button"]} >+</button>

      {children.map((child, i) => {
        return <span key={i} className={styles["circle-content"]} style={childProps[i].style}>
          {cloneElement(child as ReactElement)}
        </span>
      })}

      <span style={{ opacity: 0.2 }}>

        <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: "absolute", zIndex: 99, pointerEvents: "none" }}>
          <line x1="50" y1="50" x2={50 - downVec.vx} y2={50 - downVec.vy} stroke="black" />
        </svg>
        <Goo>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle r="40" cx="50" cy="50" onClick={handleMainClick} onTouchEnd={handleTouchEnd} onTouchStart={handleDragStart} onTouchMove={handleDrag} ></circle>
            {children.map((child, i) => {
              return <circle key={i} onClick={child.props.onClick} className={`${styles["circle-small"]} ${dragHoveredIndex === i ? styles["hovered"] : ""}`} style={childProps[i].style} r="40" cx="50" cy="50" />
            })}
          </svg>
        </Goo>
      </span>

    </div>
  )
}

export default GooeyButton
