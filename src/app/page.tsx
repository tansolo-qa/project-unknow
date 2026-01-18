import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Skills />
      <Experience />
      <Projects />

      {/* Contact CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to elevate your <span className="text-secondary">Quality Assurance</span>?</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
          I am currently open for opportunities. Let&apos;s discuss how I can help your team build robust, scalable software.
        </p>
        <a href="mailto:example@email.com" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Get In Touch
        </a>
      </section>
    </div>
  );
}
