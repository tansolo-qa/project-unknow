"use client"

import { Section } from "./ui/Section"
import { Button } from "./ui/Button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
    {
        title: "E2E Commerce Framework",
        description: "A robust automation framework built with Playwright and TypeScript implementing Page Object Model and Data-Driven Testing.",
        tags: ["Playwright", "TypeScript", "Allure Report", "GitHub Actions"],
        link: "#",
        github: "#"
    },
    {
        title: "API Stress Test Suite",
        description: "High-concurrency load testing suite using k6 simulating 50k+ virtual users with real-time Grafana dashboard monitoring.",
        tags: ["k6", "Grafana", "InfluxDB", "Docker"],
        link: "#",
        github: "#"
    },
    {
        title: "QA Management Dashboard",
        description: "Full stack application for managing test data and aggregating reports from multiple sources into a single view.",
        tags: ["Next.js", "MongoDB", "TailwindCSS", "Node.js"],
        link: "#",
        github: "#"
    }
]

export function Projects() {
    return (
        <Section id="projects">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-secondary">Projects</span></h2>
                <p className="text-muted-foreground max-w-[600px] mx-auto">
                    Showcasing my ability to build testing infrastructure and tools, not just run tests.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                    <div key={idx} className="group relative rounded-2xl border border-white/10 bg-black/40 p-8 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="px-2 py-1 rounded-md bg-white/5 text-xs font-medium text-muted-foreground border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 mt-auto">
                            <Button size="sm" variant="outline" className="gap-2">
                                <Github className="w-4 h-4" /> Code
                            </Button>
                            <Button size="sm" variant="ghost" className="gap-2">
                                <ExternalLink className="w-4 h-4" /> Demo
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}
