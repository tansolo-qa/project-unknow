"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface SectionProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function Section({ children, className, delay = 0, ...props }: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={cn("py-16 md:py-24 container mx-auto px-4", className)}
            {...props}
        >
            {children}
        </motion.section>
    )
}
