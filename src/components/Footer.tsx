export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background/50 py-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} QA Portfolio. Built with <span className="text-primary">Next.js</span> and <span className="text-secondary">Tailwind CSS</span>.
                </p>
            </div>
        </footer>
    )
}
