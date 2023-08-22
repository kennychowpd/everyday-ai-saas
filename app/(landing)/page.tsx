import { LandingContent } from '@/components/landingContent'
import { LandingHero } from '@/components/landingHero'
import { LandingNavbar } from '@/components/landingNavbar'

const LandingPage = () => {
  return (
    <div className='w-full'>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}

export default LandingPage
