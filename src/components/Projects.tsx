"use client"

import { useState } from "react"
import { Section } from "./ui/Section"
import { Button } from "./ui/Button"
import { Github, PlayCircle, BarChart3, ShieldCheck, Database, Target, Terminal } from "lucide-react"
import { DemoModal } from "./ui/DemoModal"
import { DEMO_SCENARIOS } from "@/data/demo-scenarios"

const projects = [
    {
        id: "e2e-automation",
        category: "The Core",
        title: "E2E Automation Framework",
        goal: "Build a complex, Enterprise-grade automation framework for E-commerce/Banking to master advanced testing scenarios.",
        description: "A robust automation framework built with Playwright, featuring Visual Regression, Accessibility (A11y), and Network Mocking capabilities.",
        tech: ["Playwright", "TypeScript", "GitHub Actions", "Axe-core"],
        features: [
            "Visual Regression & Accessibility Tests",
            "Network Mocking & Fault Injection",
            "Page Object Model Architecture"
        ],
        metrics: "Reduced regression time by 60%",
        icon: PlayCircle,
        sourceUrl: "https://github.com/tansolo-qa/project-unknow/tree/master/projects/e2e-automation"
    },
    {
        id: "api-contract-testing",
        category: "The Middleware",
        title: "API & Contract Testing",
        goal: "Demonstrate professional backend testing skills, including Contract Testing to ensure microservice compatibility.",
        description: "Comprehensive backend testing suite verifying business logic and contracts. Ensures frontend-backend compatibility before deployment.",
        tech: ["Supertest", "Pact.io", "Jest", "Docker"],
        features: [
            "Consumer-Driven Contract Testing",
            "Auth Validation & Security Checks",
            "Mock Server Integration"
        ],
        metrics: "Zero API breaking changes",
        icon: ShieldCheck,
        sourceUrl: "https://github.com/tansolo-qa/project-unknow/tree/master/projects/api-contract-testing"
    },
    {
        id: "performance-load-testing",
        category: "The Specialist",
        title: "High-Scale Load Testing",
        goal: "Showcase scalability awareness by simulating high concurrency (1k+ users) and identifying system bottlenecks.",
        description: "Performance analysis platform simulating 1,000+ concurrent users with real-time monitoring to ensure system stability.",
        tech: ["k6 (JS)", "Grafana", "InfluxDB", "Docker Compose"],
        features: [
            "Real-time Performance Dashboard",
            "Spike & Soak Testing scenarios",
            "Bottleneck Analysis Reports"
        ],
        metrics: "Optimized throughput by 40%",
        icon: BarChart3,
        sourceUrl: "https://github.com/tansolo-qa/project-unknow/tree/master/projects/performance-load-testing"
    },
    {
        id: "test-data-manager",
        category: "Full Stack Proof",
        title: "Test Data Manager",
        goal: "Prove 'Full Stack' capabilities by building a custom tool from scratch, demonstrating deep system understanding beyond testing.",
        description: "Custom internal tool built to generate and manage dynamic test data, solving the 'stale data' problem in staging environments.",
        tech: ["Next.js", "TailwindCSS", "MongoDB", "Node.js"],
        features: [
            "CRUD for Test Scenarios",
            "RESTful Test Data API",
            "Modern Responsive UI"
        ],
        metrics: "Boosted team efficiency by 3x",
        icon: Database,
        sourceUrl: "https://github.com/tansolo-qa/project-unknow/tree/master/projects/test-data-manager",
        demoUrl: "http://localhost:3001"
    }
]

export function Projects() {
    const [activeDemo, setActiveDemo] = useState<string | null>(null)

    return (
        <Section id="projects">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-secondary">Projects</span></h2>
                <p className="text-muted-foreground max-w-[600px] mx-auto">
                    Demonstrating &quot;Full Stack&quot; capabilities: from UI automation and backend contracts to infrastructure performance and custom tooling.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {projects.map((project, idx) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Icon = project.icon as any
                    return (
                        <div key={idx} className="group relative flex flex-col rounded-3xl border border-white/10 bg-black/40 overflow-hidden hover:border-primary/50 transition-all duration-300">

                            {/* Category Badge */}
                            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground uppercase tracking-wider font-semibold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                {project.category}
                            </div>

                            <div className="p-8 pb-0">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-6 h-6 text-foreground" />
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>

                                {/* Goal Section */}
                                <div className="mb-4 flex items-start gap-2 text-sm text-primary/90 bg-primary/5 p-3 rounded-lg border border-primary/10">
                                    <Target className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span className="font-medium italic">&quot;{project.goal}&quot;</span>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                {/* Key Features List */}
                                <ul className="space-y-2 mb-6">
                                    {project.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                                            <div className="w-1 h-1 rounded-full bg-secondary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Metrics Bar */}
                            {project.metrics && (
                                <div className="mx-8 mb-6 py-3 px-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                                    <BarChart3 className="w-4 h-4 text-green-400" />
                                    <span className="text-sm font-semibold text-green-400">{project.metrics}</span>
                                </div>
                            )}

                            <div className="mt-auto border-t border-white/5 p-6 bg-white/[0.02]">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, tIdx) => (
                                        <span key={tIdx} className="px-2.5 py-1 rounded-md bg-black border border-white/10 text-xs text-zinc-400 group-hover:border-primary/20 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full gap-2 border-white/10 hover:bg-white/5"
                                        onClick={() => window.open(project.sourceUrl, '_blank')}
                                    >
                                        <Github className="w-4 h-4" /> Source
                                    </Button>

                                    {/* @ts-expect-error - demoUrl is strictly optional and not typed in array yet */}
                                    {project.demoUrl && (
                                        <Button
                                            size="sm"
                                            className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white border-none shadow-lg shadow-indigo-900/20"
                                            onClick={() => window.open(project.demoUrl, '_blank')}
                                        >
                                            <PlayCircle className="w-4 h-4" /> Launch App
                                        </Button>
                                    )}

                                    {/* Test Demo Button */}
                                    {(project.id === 'e2e-automation' || project.id === 'performance-load-testing') && (
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="w-full gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                                            onClick={() => setActiveDemo(project.id)}
                                        >
                                            <Terminal className="w-4 h-4 text-emerald-400" /> Run Test Demo
                                        </Button>
                                    )}

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <DemoModal
                isOpen={!!activeDemo}
                onClose={() => setActiveDemo(null)}
                projectTitle={activeDemo ? projects.find(p => p.id === activeDemo)?.title || 'Terminal' : ''}
                command={activeDemo === 'e2e-automation' ? DEMO_SCENARIOS.e2e.command : DEMO_SCENARIOS.load.command}
                logs={activeDemo === 'e2e-automation' ? DEMO_SCENARIOS.e2e.logs : activeDemo === 'performance-load-testing' ? DEMO_SCENARIOS.load.logs : []}
            />
        </Section>
    )
}
