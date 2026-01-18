"use client"

import { Section } from "./ui/Section"

const experiences = [
    {
        role: "Automated Test Engineer",
        company: "Arise by INFINITAS",
        period: "Jan 2023 - Present",
        description: "Leading automation development for 'Tungngern' platform. Designed robust test scripts for Web & API, optimized regression cycles, and managed defect tracking in an Agile environment.",
        location: "Bangkok"
    },
    {
        role: "Software Test Engineer",
        company: "ADI Group - ASIA",
        period: "Sep 2020 - Dec 2022",
        description: "Executed comprehensive test plans for Krungthai Bank & Krungthai NEXT mobile apps. Managed defect lifecycles and maintained web automation scripts.",
        location: "Bangkok"
    },
    {
        role: "Quality Assurance Engineer",
        company: "aCommerce",
        period: "Apr 2020 - Aug 2020",
        description: "Focused on E-commerce solutions. Conducted manual & automated testing for backend microservices and performed functional regression testing.",
        location: "Bangkok"
    },
    {
        role: "Software Test Engineer",
        company: "Aware Group",
        period: "Jan 2018 - Mar 2020",
        description: "Consultant for major clients (Minor Food, SCBLIFE, BBL). Translated business specs into test plans and executed functional validation.",
        location: "Bangkok"
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
                                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                                    <div className="flex gap-2">
                                        <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5">{exp.location}</span>
                                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{exp.period}</span>
                                    </div>
                                </div>
                                <div className="text-secondary font-medium text-sm mb-3 flex items-center gap-2">
                                    {exp.company}
                                </div>
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
