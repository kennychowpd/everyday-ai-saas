'use client'

import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './sidebar'
import { useEffect, useState } from 'react'

interface MobileSidebarProps {
  apiCount: number
  isPro: boolean
}

const MobileSidebar = ({ apiCount = 0, isPro = false }: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='p-0 w-56'>
        <Sidebar apiCount={apiCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
