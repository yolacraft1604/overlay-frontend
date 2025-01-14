"use client";

import { motion } from "framer-motion";
import {ReactNode, useEffect, useState} from "react";

interface FlyInDivProps {
    children: ReactNode;
}

export const FlyInDiv: React.FC<FlyInDivProps> = ({ children }) => {
    const [hasExited, setHasExited] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasExited(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{
                x: hasExited ? "-100%" : 0,
                opacity: hasExited ? 0 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: 0.5,
                delay: 0.5,
            }}
            className="p-4 bg-[#86cf28] text-white rounded shadow-lg"
        >
            {children}
        </motion.div>
    );
};

