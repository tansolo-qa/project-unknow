"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal, Play, Maximize2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "./Button"

interface DemoModalProps {
    isOpen: boolean
    onClose: () => void
    projectTitle: string
    command: string
    logs: string[]
}

export function DemoModal({ isOpen, onClose, projectTitle, command, logs }: DemoModalProps) {
    const [lines, setLines] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Reset whenever modal opens
    useEffect(() => {
        if (isOpen) {
            setLines([])
            setCurrentIndex(0)
            setIsComplete(false)
        }
    }, [isOpen])

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [lines])

    // Typing effect
    useEffect(() => {
        if (!isOpen) return
        if (currentIndex >= logs.length) {
            setIsComplete(true)
            return
        }

        const timeout = setTimeout(() => {
            setLines(prev => [...prev, logs[currentIndex]])
            setCurrentIndex(prev => prev + 1)
        }, Math.random() * 200 + 100) // Random delay between 100-300ms

        return () => clearTimeout(timeout)
    }, [currentIndex, isOpen, logs])

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-mono">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[80vh]"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-black/50">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="ml-4 flex items-center gap-2 text-sm text-zinc-400">
                                    <Terminal className="w-4 h-4" />
                                    <span>{projectTitle} — bash — 80x24</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 text-zinc-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Terminal Body */}
                        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-300">
                            <div className="mb-4 text-green-400 font-bold flex items-center gap-2">
                                <span>➜</span>
                                <span>~</span>
                                <span className="text-white">{command}</span>
                            </div>

                            <div className="space-y-1">
                                {lines.map((line, idx) => (
                                    <div key={idx} className={`${line.includes("Error") ? "text-red-400" : line.includes("✓") ? "text-green-400" : ""}`}>
                                        {line}
                                    </div>
                                ))}
                                {isComplete && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-6 p-4 rounded bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="font-bold">✨ Demo Sequence Completed Successfully</span>
                                    </motion.div>
                                )}
                                <div ref={bottomRef} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
