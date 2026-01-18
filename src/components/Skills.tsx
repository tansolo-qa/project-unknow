"use client"

import { Section } from "./ui/Section"
import { CheckCircle2 } from "lucide-react"

const skillCategories = [
    {
        title: "Web Automation",
        skills: ["Playwright", "Cypress", "Selenium WebDriver", "Puppeteer", "Page Object Model", "TypeScript"]
    },
    {
        title: "API & Performance",
        skills: ["Postman / Newman", "RestAssured", "k6", "JMeter", "GraphQL Testing", "Contract Testing (Pact)"]
    },
    {
        title: "DevOps & CI/CD",
        skills: ["Docker", "Kubernetes", "GitHub Actions", "Jenkins", "AWS Basic", "Terraform"]
    },
    {
        title: "Development",
        skills: ["JavaScript / Node.js", "React / Next.js", "Python", "SQL / NoSQL", "Git Version Control", "Agile / Scrum"]
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
                    A comprehensive set of tools and technologies I use to ensure software quality and reliability.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillCategories.map((category, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/30 transition-colors duration-300">
                        <h3 className="text-xl font-semibold mb-6 text-foreground">{category.title}</h3>
                        <ul className="space-y-3">
                            {category.skills.map((skill, sIdx) => (
                                <li key={sIdx} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    )
}
