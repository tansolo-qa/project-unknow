"use client"

import { Section } from "./ui/Section"
import { CheckCircle2, Code2, Globe, Server, CloudCog } from "lucide-react"

const skillCategories = [
    {
        title: "Languages",
        icon: Code2,
        skills: ["JavaScript / TypeScript", "Python", "Java", "SQL"]
    },
    {
        title: "Web Testing",
        icon: Globe,
        skills: ["Playwright (Advanced)", "Visual Testing (Pixel-perfect)", "Axe-core (Accessibility)", "Cypress", "Page Object Model (POM)"]
    },
    {
        title: "API Testing",
        icon: Server,
        skills: ["Postman / Newman", "Supertest (JS)", "RestAssured (Java)", "Pact.io (Contract Testing)", "Security (Auth/Rate Limiting)"]
    },
    {
        title: "DevOps & Tools",
        icon: CloudCog,
        skills: ["Docker & Kubernetes", "Jenkins / GitHub Actions", "k6 (Performance)", "Prometheus / Grafana", "Appium (Mobile)"]
    }
]

export function Skills() {
    return (
        <Section id="skills" className="bg-white/5 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="text-primary">Arsenal</span></h2>
                <p className="text-muted-foreground max-w-[600px] mx-auto">
                    A specialized stack focused on End-to-End quality, from reduced flakiness to high-scale performance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillCategories.map((category, idx) => {
                    const Icon = category.icon
                    return (
                        <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                            </div>
                            <ul className="space-y-3">
                                {category.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </Section>
    )
}
