"use client"

import { Section } from "./ui/Section"

const experiences = [
    {
        role: "Senior QA Engineer",
        company: "Tech Solutions Inc.",
        period: "2023 - Present",
        description: "Leading the automation team, implementing Playwright across 5 key products, and reducing regression testing time by 60%."
    },
    {
        role: "Software Test Engineer",
        company: "Digital Bank Co.",
        period: "2021 - 2023",
        description: "Developed API testing frameworks using RestAssured and integrated CI/CD pipelines with Jenkins."
    },
    {
        role: "Junior Developer / Tester",
        company: "StartUp Hub",
        period: "2019 - 2021",
        description: "Started as a developer, transitioned to building internal testing tools and unit tests in Jest."
    }
]

export function Experience() {
    return (
        <Section id="about" className="py-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Professional <span className="text-primary">Journey</span></h2>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            {/* Icon / Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                            </div>

                            {/* Content Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                    <h3 className="font-bold text-lg">{exp.role}</h3>
                                    <span className="text-xs font-mono text-muted-foreground bg-black/30 px-2 py-1 rounded">{exp.period}</span>
                                </div>
                                <div className="text-secondary font-medium text-sm mb-3">{exp.company}</div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
