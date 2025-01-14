"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface FlyInDivProps {
    children: ReactNode;
}

export const PageTreeDiv: React.FC<FlyInDivProps> = ({ children }) => {
    const [hasEntered, setHasEntered] = useState(false);
    const [hasExited, setHasExited] = useState(false);

    useEffect(() => {
        const enterTimer = setTimeout(() => {
            setHasEntered(true);
        }, 6000);

        const exitTimer = setTimeout(() => {
            setHasExited(true);
        }, 11000);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
        };
    }, []);

    return (
        <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{
                y: hasExited ? "-100%" : hasEntered ? "0%" : "100%",
                opacity: hasExited ? 0 : hasEntered ? 1 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: 1,
            }}
            className=""
        >
            {children}
        </motion.div>
    );
};
