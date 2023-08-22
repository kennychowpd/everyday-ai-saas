import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiCount } from '@/lib/api-count'
import { checkSubscription } from '@/lib/subscription'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiCount = await getApiCount()
  const isPro = await checkSubscription()

  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 md:w-56 bg-gray-900'>
        <Sidebar
          apiCount={apiCount}
          isPro={isPro!}
        />
      </div>
      <main className='md:pl-56'>
        <Navbar apiCount={apiCount} />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
