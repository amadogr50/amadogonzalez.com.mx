import Link from 'next/link'

import { Container } from '@/components/container'

export async function WritingPreview() {
  return (
    <section id='writing'>
      <Container className="py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
        Writing
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        Notes on building things
      </h2>
      <p className="mt-3 max-w-[600px] text-sm text-stone">
        I write about the intersection of engineering, infrastructure, and
        running a real business. Mostly practical — occasionally reflective.
      </p>
      <div className="mt-8 h-px w-10 bg-sage" />

      <div className="mt-8 space-y-4">
        <p className="text-sm italic text-warm-gray-light">
            Posts coming soon.
          </p>
      </div>
      </Container>
    </section>
  )
}
