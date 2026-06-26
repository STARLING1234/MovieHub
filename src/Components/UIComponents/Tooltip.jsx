import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Tooltip.scss";

const Tooltip = ({ content, children, position = "top" }) => {
  const [active, setActive] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      // Adjust positioning relative to viewport + scroll
      if (position === "top") {
        top = rect.top + scrollY - 8; // 8px spacing offset
        left = rect.left + scrollX + rect.width / 2;
      } else if (position === "bottom") {
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + rect.width / 2;
      } else if (position === "left") {
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 8;
      } else if (position === "right") {
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 8;
      }

      setCoords({ top, left });
    }
  };

  useEffect(() => {
    if (active) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [active, position]);

  const showTooltip = () => setActive(true);
  const hideTooltip = () => setActive(false);

  // Portal template element injected into the document body
  const tooltipElement = active && content && (
    ReactDOM.createPortal(
      <div 
        className={`custom-tooltip tooltip-${position}`}
        style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
      >
        {content}
      </div>,
      document.body
    )
  );

  return (
    <div 
      className="tooltip-trigger-wrapper"
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      style={{ display: "inline-block" }}
    >
      {children}
      {tooltipElement}
    </div>
  );
};

export default Tooltip;
