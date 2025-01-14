"use client";

import { motion } from "framer-motion";
import {ReactNode, useEffect, useState} from "react";

interface FlyInDivProps {
    children: ReactNode;
}

export const FlyUpDiv: React.FC<FlyInDivProps> = ({ children }) => {
    const [hasExited, setHasExited] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasExited(true);
        }, 19000);

        const timer2 = setTimeout(() => {
            location.reload();
        }, 110000);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        }
    }, []);

    return (
        <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{
                y: hasExited ? "-100%" : 0,
                opacity: hasExited ? 0 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: 0.5,
                delay: 0,
            }}
            className=""
        >
            {children}
        </motion.div>
    );
};