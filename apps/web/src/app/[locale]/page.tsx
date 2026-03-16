import { setRequestLocale } from 'next-intl/server'

import { Hero } from '@/components/hero'
import { WorkExperience } from '@/components/work-experience'
import { SelectedWork } from '@/components/selected-work'
import { TechStack } from '@/components/tech-stack'
import { WritingPreview } from '@/components/writing-preview'
import { Contact } from '@/components/contact'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <SelectedWork />
      <WorkExperience />
      <TechStack />
      <WritingPreview />
      <Contact />
    </>
  )
}
