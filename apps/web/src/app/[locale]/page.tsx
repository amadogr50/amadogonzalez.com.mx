import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { SelectedWork } from '@/components/selected-work'
import { TechStack } from '@/components/tech-stack'
import { WorkExperience } from '@/components/work-experience'
import { WritingPreview } from '@/components/writing-preview'
import { setRequestLocale } from 'next-intl/server'

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
