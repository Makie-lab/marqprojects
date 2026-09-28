"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, summary, [role='button'], [data-cursor='interactive']";

/**
 * Fine-pointer-only cursor whose white fill uses difference blending to invert
 * whatever part of the space interface sits beneath it.
 */
export default function InvertedCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const forcedColorsQuery = window.matchMedia("(forced-colors: active)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardownCursor = () => {};

    const setupCursor = () => {
      const root = document.documentElement;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return () => {};

      let targetX = -100;
      let targetY = -100;
      let ringX = -100;
      let ringY = -100;
      let hasPosition = false;
      let visible = false;
      let animationFrame = 0;
      let frameScheduled = false;

      const transform = (x: number, y: number) =>
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      const scheduleFrame = () => {
        if (frameScheduled) return;
        frameScheduled = true;
        animationFrame = window.requestAnimationFrame(render);
      };

      const render = () => {
        frameScheduled = false;
        const ease = reduceMotionQuery.matches ? 1 : 0.18;
        ringX += (targetX - ringX) * ease;
        ringY += (targetY - ringY) * ease;
        ring.style.transform = transform(ringX, ringY);

        const stillMoving =
          Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1;
        if (visible && stillMoving) scheduleFrame();
      };

      const resetStates = () => {
        dot.classList.remove("is-interactive", "is-pressed");
        ring.classList.remove("is-interactive", "is-pressed");
      };

      const setVisible = (nextVisible: boolean) => {
        visible = nextVisible;
        dot.classList.toggle("is-visible", nextVisible);
        ring.classList.toggle("is-visible", nextVisible);
        if (!nextVisible) {
          resetStates();
          hasPosition = false;
          window.cancelAnimationFrame(animationFrame);
          frameScheduled = false;
        }
      };

      const onPointerMove = (event: PointerEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;
        dot.style.transform = transform(targetX, targetY);

        if (!hasPosition) {
          ringX = targetX;
          ringY = targetY;
          ring.style.transform = transform(ringX, ringY);
          hasPosition = true;
        }

        setVisible(true);
        scheduleFrame();
      };

      const onPointerOver = (event: PointerEvent) => {
        const target = event.target;
        const interactive =
          target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
        dot.classList.toggle("is-interactive", interactive);
        ring.classList.toggle("is-interactive", interactive);
      };

      const onPointerDown = () => {
        dot.classList.add("is-pressed");
        ring.classList.add("is-pressed");
      };

      const clearPressed = () => {
        dot.classList.remove("is-pressed");
        ring.classList.remove("is-pressed");
      };

      const onPointerLeave = (event: PointerEvent) => {
        if (!event.relatedTarget) setVisible(false);
      };

      const onPointerCancel = () => {
        clearPressed();
        setVisible(false);
      };

      const onVisibilityChange = () => {
        if (document.hidden) setVisible(false);
      };

      root.classList.add("has-inverted-cursor");
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerover", onPointerOver, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerup", clearPressed, { passive: true });
      window.addEventListener("pointercancel", onPointerCancel, { passive: true });
      window.addEventListener("pointerout", onPointerLeave, { passive: true });
      window.addEventListener("blur", onPointerCancel);
      document.addEventListener("visibilitychange", onVisibilityChange);

      return () => {
        setVisible(false);
        root.classList.remove("has-inverted-cursor");
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerover", onPointerOver);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", clearPressed);
        window.removeEventListener("pointercancel", onPointerCancel);
        window.removeEventListener("pointerout", onPointerLeave);
        window.removeEventListener("blur", onPointerCancel);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    };

    const applyCapability = () => {
      teardownCursor();
      teardownCursor = () => {};
      if (pointerQuery.matches && !forcedColorsQuery.matches) {
        teardownCursor = setupCursor();
      }
    };

    pointerQuery.addEventListener("change", applyCapability);
    forcedColorsQuery.addEventListener("change", applyCapability);
    applyCapability();

    return () => {
      pointerQuery.removeEventListener("change", applyCapability);
      forcedColorsQuery.removeEventListener("change", applyCapability);
      teardownCursor();
    };
  }, []);

  return (
    <div className="space-cursor" aria-hidden="true">
      <span ref={ringRef} className="space-cursor__ring" />
      <span ref={dotRef} className="space-cursor__dot" />
    </div>
  );
}
