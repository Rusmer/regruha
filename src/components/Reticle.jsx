import React, { useEffect, useState } from "react";

export default function Reticle() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("reticle-host");
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const el = e.target;
      setActive(!!(el.closest("a, button, [data-node]")));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      document.body.classList.remove("reticle-host");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[100] hidden md:block"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
      <div
        className="relative transition-all duration-150 ease-out"
        style={{ width: active ? 44 : 24, height: active ? 44 : 24 }}
      >
        <span className="absolute inset-0 border border-gold rounded-full" style={{ opacity: active ? 1 : 0.7 }} />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold rounded-full" style={{ width: 3, height: 3 }} />
        {active && (
          <>
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-px bg-gold" />
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-px bg-gold" />
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-px bg-gold" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-px bg-gold" />
          </>
        )}
      </div>
    </div>
  );
}