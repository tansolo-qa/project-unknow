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
    runType: 'e2e' | 'load' | 'api' | null
}

export function DemoModal({ isOpen, onClose, projectTitle, command, runType }: DemoModalProps) {
    const [lines, setLines] = useState<string[]>([])
    const [isComplete, setIsComplete] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    // Reset whenever modal opens
    useEffect(() => {
        if (isOpen && runType && !isRunning) {
            setLines([])
            setIsComplete(false)
            startStreaming(runType)
        }

        // Cleanup on close
        if (!isOpen) {
            abortControllerRef.current?.abort()
            setIsRunning(false)
        }
    }, [isOpen, runType])

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [lines])

    const startStreaming = async (type: string) => {
        setIsRunning(true)
        abortControllerRef.current = new AbortController()

        try {
            const response = await fetch(`/api/run-demo?type=${type}`, {
                signal: abortControllerRef.current.signal
            })

            if (!response.body) return

            const reader = response.body.getReader()
            const decoder = new TextDecoder()

            while (true) {
                const { value, done } = await reader.read()
                if (done) break

                const text = decoder.decode(value, { stream: true })
                // Split by newlines and filter empty strings conservatively
                const newLines = text.split(/\r?\n/)

                setLines(prev => {
                    const lastLine = prev[prev.length - 1] || ''
                    // If the chunk doesn't start with newline, append to last line
                    // Simplified: just append all for now to handle simple logs
                    return [...prev, ...newLines]
                })
            }
            setIsComplete(true)
        } catch (error: any) {
            if (error.name === 'AbortError') return
            setLines(prev => [...prev, `\n❌ Error: ${error.message}`])
        } finally {
            setIsRunning(false)
        }
    }

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
                        exit={{ opacity: 0, scale: 0.95, y: 0 }}
                        className="relative w-full max-w-4xl bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[85vh] h-[600px]"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-black/50 shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="ml-4 flex items-center gap-2 text-sm text-zinc-400">
                                    <Terminal className="w-4 h-4" />
                                    <span>{projectTitle} — live execution — local</span>
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

                            <div className="space-y-0.5 whitespace-pre-wrap">
                                {lines.map((line, idx) => (
                                    <div key={idx} className={`${line.includes("Error") || line.includes("failed") ? "text-red-400" : line.includes("passed") || line.includes("✓") ? "text-green-400" : ""}`}>
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
                                        <span className="font-bold">✨ Execution Completed</span>
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
