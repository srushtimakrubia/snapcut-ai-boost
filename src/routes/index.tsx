import { createFileRoute } from "@tanstack/react-router";

import { Logo } from "@/components/Logo";
import { UploadWidget } from "@/components/UploadWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI — Remove image backgrounds in one click" },
      {
        name: "description",
        content:
          "Upload an image and get a transparent PNG in seconds. AI-powered background remover for e-commerce, designers, and creators.",
      },
      { property: "og:title", content: "SnapCut AI — Remove image backgrounds in one click" },
      {
        property: "og:description",
        content: "Upload an image and get a transparent PNG in seconds. Powered by AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight">
            SnapCut <span className="text-secondary">AI</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
          <a href="#how" className="text-sm font-medium text-muted-foreground hover:text-foreground">How it works</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/snapcut-ai/snapcut-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-surface p-2 text-foreground transition hover:bg-surface-muted"
            aria-label="View SnapCut AI on GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href="#upload"
            className="inline-flex items-center rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95"
          >
            Try it free
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-hero">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            AI-powered · Under 5 seconds
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Remove image backgrounds{" "}
            <span className="text-gradient-primary">in one click.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Upload any photo and get a clean, transparent PNG in seconds — perfect for product listings,
            social posts, thumbnails, and design work.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check /> No signup to try
            </div>
            <div className="flex items-center gap-2">
              <Check /> High-res output
            </div>
            <div className="flex items-center gap-2">
              <Check /> Images auto-deleted
            </div>
          </div>
        </div>
        <div id="upload" className="lg:pl-4">
          <div className="rounded-3xl border bg-surface/80 p-4 shadow-soft backdrop-blur sm:p-6">
            <UploadWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

const FEATURES = [
  { title: "One-click magic", desc: "Drop an image, get a transparent PNG. No sliders, no learning curve.", icon: "✂️" },
  { title: "Studio-grade quality", desc: "Clean edges around hair, fur, and complex shapes.", icon: "✨" },
  { title: "Fast by design", desc: "Most images finish in under 5 seconds.", icon: "⚡" },
  { title: "Made for e-commerce", desc: "Consistent, marketplace-ready product cutouts.", icon: "🛍️" },
  { title: "Privacy first", desc: "Uploads processed over HTTPS and deleted after 24 hours.", icon: "🔒" },
  { title: "Bulk-friendly", desc: "Scale with Pro or the API — process hundreds without slowing down.", icon: "📦" },
];

function Features() {
  return (
    <section id="features" className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Features</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Everything you need. Nothing you don't.</h2>
          <p className="mt-4 text-muted-foreground">
            SnapCut AI does one thing exceptionally well — remove backgrounds — so you can move faster.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border bg-surface p-6 transition hover:shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-xl">{f.icon}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Upload", d: "Drag & drop a JPG, PNG, or WEBP up to 10MB." },
  { n: "02", t: "AI processes", d: "Our model isolates the subject and removes the background." },
  { n: "03", t: "Download", d: "Preview the result and save a transparent PNG." },
];

function HowItWorks() {
  return (
    <section id="how" className="border-t bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Three steps to a clean cutout</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-2xl border bg-surface p-8">
              <div className="font-display text-4xl font-bold text-gradient-primary">{s.n}</div>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For occasional use and trying it out.",
    features: ["5 images per day", "High-res output", "Web app access"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    desc: "Unlimited cutouts for creators and marketers.",
    features: ["Unlimited images", "Priority processing", "Batch uploads", "Email support"],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    desc: "For teams and API integrations.",
    features: ["Everything in Pro", "Public API access", "Higher rate limits", "Team seats"],
    cta: "Contact sales",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Pricing</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Simple pricing, no surprises</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border bg-surface p-8 transition ${
                p.highlight ? "border-secondary shadow-glow" : "hover:shadow-soft"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-premium px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-foreground">
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-xl px-4 py-3 font-semibold transition ${
                  p.highlight
                    ? "bg-gradient-primary text-primary-foreground shadow-soft hover:opacity-95"
                    : "border border-input bg-surface text-foreground hover:bg-surface-muted"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Is SnapCut AI free to use?", a: "Yes — the Free plan gives you 5 images per day, no signup required to try it." },
  { q: "What image formats are supported?", a: "JPG, PNG, and WEBP up to 10MB and 5000×5000 pixels." },
  { q: "Do you store my images?", a: "No. Uploads are processed securely and automatically deleted within 24 hours." },
  { q: "How good is the quality?", a: "We use a production-grade AI model that handles hair, fur, and complex edges cleanly." },
  { q: "Is there an API?", a: "Yes — API access is included with the Business plan for programmatic background removal." },
];

function FAQ() {
  return (
    <section id="faq" className="border-t bg-surface-muted">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-secondary">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Frequently asked</h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border bg-surface p-5 transition hover:shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-foreground">
                {f.q}
                <span className="ml-4 text-secondary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to cut out the background?</h2>
        <p className="mt-3 text-muted-foreground">Upload your first image — it takes under 5 seconds.</p>
        <a
          href="#upload"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition hover:opacity-95"
        >
          Try SnapCut AI free
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="font-display font-semibold">SnapCut AI</span>
        </div>
        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} SnapCut AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
