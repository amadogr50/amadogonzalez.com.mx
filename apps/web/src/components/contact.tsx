const links = [
  {
    label: 'Email',
    href: 'mailto:amadogr@proton.me',
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amadogr/',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/amadogr50',
    external: true,
  },
]

export function Contact() {
  return (
    <section id="contact" className="w-full bg-ink px-6 py-28 text-center md:px-12 md:py-36">
      <div className="mx-auto max-w-[600px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
          Contact
        </p>

        <h2 className="mt-4 font-serif text-[36px] font-light leading-tight text-cream md:text-[44px]">
          Let&apos;s build something meaningful
        </h2>

        <div className="mx-auto mt-8 h-px w-10 bg-sage/40" />

        <p className="mx-auto mt-8 max-w-[480px] text-[15px] leading-relaxed text-warm-gray-light">
          I’m particularly interested in thoughtful conversations about building meaningful technology.
        </p>
        <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-warm-gray-light">
          If you’re exploring ambitious ideas in AI, product, or the future of work, I’d enjoy connecting and exchanging perspectives. Sometimes the most interesting things start with a simple conversation.
        </p>

        <nav aria-label="Contact links">
          <ul className="mt-12 flex flex-wrap justify-center gap-4">
            {links.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="btn-ink ring-1 ring-cream/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <span className="btn-ink-label inline-flex items-center gap-2">
                    {label}
                    {external && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="opacity-60"
                      >
                        <path d="M2 10L10 2M5 2h5v5" />
                      </svg>
                    )}
                  </span>
                  <span className="btn-ink-label-hover inline-flex items-center gap-2">
                    {label}
                    {external && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="opacity-60"
                      >
                        <path d="M2 10L10 2M5 2h5v5" />
                      </svg>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
