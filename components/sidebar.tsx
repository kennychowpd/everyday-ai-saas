'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import {usePathname} from 'next/navigation'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import {
  Code2,
  ImageIcon,
  Layout,
  MessageSquare,
  Music,
  Settings2,
  Video,
} from 'lucide-react'

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
})

const routes = [
  {
    label: 'Dashboard',
    icon: Layout,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Chat',
    icon: MessageSquare,
    href: '/chat',
    color: 'text-lime-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image-generation',
    color: 'text-purple-500',
  },
  {
    label: 'Video Generation',
    icon: Video,
    href: '/video-generation',
    color: 'text-orange-500',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music-generation',
    color: 'text-red-500',
  },
  {
    label: 'Code Generation',
    icon: Code2,
    href: '/code-generation',
    color: 'text-yellow-400',
  },
  {
    label: 'Settings',
    icon: Settings2,
    href: '/settings',
    color: 'text-gray-500',
  },
]

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-gray-900 text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link
          href='/dashboard'
          className='flex items-center pl-3 mb-14'>
          <div className='relative w-10 h-10 mr-4'>
            <Image
              fill
              alt='Logo'
              src='/logo.png'
            />
          </div>
          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            Everyday AI
          </h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathname === route.href ? 'text-white bg-white/10': 'text-zinc-400')}>
              <div className='flex flex-1 items-center'>
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
