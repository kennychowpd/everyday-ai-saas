import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { checkSubscription } from '@/lib/subscription'

interface NavbarProps {
  apiCount: number
}
const Navbar = async ({ apiCount }: NavbarProps) => {
  const isPro = await checkSubscription()

  return (
    <div className='flex items-center p-4'>
      <MobileSidebar
        apiCount={apiCount}
        isPro={isPro!}
      />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default Navbar
