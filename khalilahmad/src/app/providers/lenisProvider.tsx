"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
        children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
        // const location = useLocation();

        // useEffect(() => {
        //         // Scroll to top when location changes
        //         window.scrollTo(0, 0);
        // }, [location.pathname]);

        useEffect(() => {
                const lenis = new Lenis({
                        duration: 0.10, // slightly faster than default (1.2)
                        easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic ease-out
                        smoothWheel: true,
                        touchMultiplier: 2,
                        infinite: false,
                });

                function raf(time: number) {
                        lenis.raf(time);
                        requestAnimationFrame(raf);
                }

                requestAnimationFrame(raf);

                return () => {
                        lenis.destroy();
                };
        }, []);

        return <>{children}</>;
};

export default SmoothScroll;