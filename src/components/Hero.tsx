"use client"

import { Button } from "./ui/Button"
import { Section } from "./ui/Section"
import { ArrowRight, Code2, Database, ShieldCheck } from "lucide-react"

export function Hero() {
    return (
        <div className="relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full opacity-30 pointer-events-none" />

            <Section className="pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Open to Work
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50">
                    Full Stack <span className="text-primary">QA Engineer</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px] mb-10 leading-relaxed">
                    &quot;I ensure software quality and reliability as an <span className="text-foreground font-medium">Automated Test Engineer</span>. With over 3 years of experience, I specialize in designing robust test plans, executing comprehensive test scenarios, and optimizing regression cycles using advanced automation tools.&quot;
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-base">
                        View Projects <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                        Contact Me
                    </Button>
                </div>

                {/* Tech Badges */}
                <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-3 gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex flex-col items-center gap-2">
                        <Code2 className="w-8 h-8" />
                        <span className="text-sm">Automation</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="w-8 h-8" />
                        <span className="text-sm">Security</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Database className="w-8 h-8" />
                        <span className="text-sm">Performance</span>
                    </div>
                </div>
            </Section>
        </div>
    )
}
