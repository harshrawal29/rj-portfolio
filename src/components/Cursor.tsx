import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const isFine = window.matchMedia('(pointer: fine)').matches;
      setIsDesktop(isFine);
      if (isFine) {
        document.body.style.cursor = 'none';

        // Hide cursors for all interactive elements to prevent default cursor flashing
        const style = document.createElement('style');
        style.id = 'hide-default-cursor';
        style.innerHTML = `
          *, *::before, *::after {
            cursor: none !important;
          }
        `;
        document.head.appendChild(style);
      } else {
        document.body.style.cursor = 'auto';
        const style = document.getElementById('hide-default-cursor');
        if (style) style.remove();
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => {
      window.removeEventListener('resize', checkDevice);
      const style = document.getElementById('hide-default-cursor');
      if (style) style.remove();
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current || !dotRef.current) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    // QuickTo for smooth interpolation
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' });

    let isMagnetic = false;
    let magneticTarget: HTMLElement | null = null;
    let buttonMoveHandler: ((e: MouseEvent) => void) | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (isMagnetic && magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnet effect: cursor pulls towards center of button
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        xTo(centerX + distanceX * 0.1);
        yTo(centerY + distanceY * 0.1);

        dotXTo(centerX + distanceX * 0.05);
        dotYTo(centerY + distanceY * 0.05);
      } else {
        xTo(e.clientX);
        yTo(e.clientY);

        dotXTo(e.clientX);
        dotYTo(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const interactable = target.closest('a, button, input, textarea, select, [role="button"]');
      if (interactable) {

        const isButton = target.closest('button, .btn, [role="button"]');
        if (isButton) {
          isMagnetic = true;
          magneticTarget = isButton as HTMLElement;

          gsap.to(cursor, {
            scale: 1.3,
            borderWidth: '1px',
            opacity: 0.5,
            duration: 0.3
          });

          gsap.to(dot, {
            scale: 0,
            duration: 0.3
          });

          // Magnetic button effect: move the button slightly towards cursor
          buttonMoveHandler = (moveEvent: MouseEvent) => {
            if (!magneticTarget) return;
            const rect = magneticTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = moveEvent.clientX - centerX;
            const distanceY = moveEvent.clientY - centerY;

            gsap.to(magneticTarget, {
              x: distanceX * 0.3,
              y: distanceY * 0.3,
              duration: 0.4,
              ease: 'power2.out'
            });
          };

          magneticTarget.addEventListener('mousemove', buttonMoveHandler);

        } else {
          // Small thin hover for links
          gsap.to(cursor, {
            scale: 1.3,
            borderWidth: '0.5px',
            backgroundColor: 'transparent',
            duration: 0.3
          });
          gsap.to(dot, {
            scale: 0,
            duration: 0.3
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactable = target.closest('a, button, input, textarea, select, [role="button"]');

      if (interactable) {
        if (isMagnetic && magneticTarget) {
          if (buttonMoveHandler) {
            magneticTarget.removeEventListener('mousemove', buttonMoveHandler);
            buttonMoveHandler = null;
          }

          // Reset button position
          gsap.to(magneticTarget, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)'
          });

          isMagnetic = false;
          magneticTarget = null;
        }

        gsap.to(cursor, {
          scale: 1,
          borderWidth: '1.5px',
          backgroundColor: 'transparent',
          opacity: 1,
          duration: 0.3
        });

        gsap.to(dot, {
          scale: 1,
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (magneticTarget && buttonMoveHandler) {
        magneticTarget.removeEventListener('mousemove', buttonMoveHandler);
      }
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform, width, height' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
