"use client"

import Link from "next/link"
import { Github, Linkedin, Terminal } from "lucide-react"
import { Button } from "./ui/Button"
import { motion } from "framer-motion"

export function Navbar() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Terminal className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">QA.FullStack</span>
                </Link>

                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="#skills" className="hover:text-foreground transition-colors">Skills</Link>
                        <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
                        <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
                    </nav>

                    <div className="h-6 w-px bg-border hidden md:block" />

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}
