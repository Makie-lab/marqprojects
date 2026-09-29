"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, summary, [role='button'], [data-cursor='interactive']";

/**
 * Fine-pointer-only cursor lens. Everything inside the circle is shown with
 * its colors inverted; the page outside the circle is unaffected.
 */
export default function InvertedCursor() {
  const lensRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const forcedColorsQuery = window.matchMedia("(forced-colors: active)");
    let teardownCursor = () => {};

    const setupCursor = () => {
      const root = document.documentElement;
      const lens = lensRef.current;
      if (!lens) return () => {};

      let x = -100;
      let y = -100;
      let animationFrame = 0;
      let frameScheduled = false;

      const render = () => {
        frameScheduled = false;
        lens.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      };

      const scheduleFrame = () => {
        if (frameScheduled) return;
        frameScheduled = true;
        animationFrame = window.requestAnimationFrame(render);
      };

      const setVisible = (visible: boolean) => {
        lens.classList.toggle("is-visible", visible);
        if (!visible) {
          lens.classList.remove("is-interactive", "is-pressed");
          window.cancelAnimationFrame(animationFrame);
          frameScheduled = false;
        }
      };

      const onPointerMove = (event: PointerEvent) => {
        x = event.clientX;
        y = event.clientY;
        scheduleFrame();
        setVisible(true);
      };

      const onPointerOver = (event: PointerEvent) => {
        const target = event.target;
        const interactive =
          target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
        lens.classList.toggle("is-interactive", interactive);
      };

      const onPointerDown = () => lens.classList.add("is-pressed");
      const clearPressed = () => lens.classList.remove("is-pressed");

      const onPointerLeave = (event: PointerEvent) => {
        if (!event.relatedTarget) setVisible(false);
      };

      const hide = () => setVisible(false);

      const onVisibilityChange = () => {
        if (document.hidden) hide();
      };

      root.classList.add("has-inverted-cursor");
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerover", onPointerOver, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerup", clearPressed, { passive: true });
      window.addEventListener("pointercancel", hide, { passive: true });
      window.addEventListener("pointerout", onPointerLeave, { passive: true });
      window.addEventListener("blur", hide);
      document.addEventListener("visibilitychange", onVisibilityChange);

      return () => {
        hide();
        root.classList.remove("has-inverted-cursor");
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerover", onPointerOver);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", clearPressed);
        window.removeEventListener("pointercancel", hide);
        window.removeEventListener("pointerout", onPointerLeave);
        window.removeEventListener("blur", hide);
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
      <span ref={lensRef} className="space-cursor__lens" />
    </div>
  );
}
