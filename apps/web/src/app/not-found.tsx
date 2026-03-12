import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-6 text-center md:px-12">
      <h1 className="font-serif text-[52px] font-light text-sage">404</h1>
      <p className="mt-4 text-base text-stone">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 border-b border-sage pb-0.5 text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:text-sage"
      >
        Back to home
      </Link>
    </div>
  )
}
