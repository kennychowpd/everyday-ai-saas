'use client'
import {
  Check,
  Code2,
  ImageIcon,
  MessageSquare,
  Music,
  Sparkles,
  Video,
} from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const tools = [
  {
    label: 'Chat',
    icon: MessageSquare,
    href: '/chat',
    color: 'text-lime-500',
    bgColor: 'bg-lime-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image-generation',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    label: 'Video Generation',
    icon: Video,
    href: '/video-generation',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music-generation',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    label: 'Code Generation',
    icon: Code2,
    href: '/code-generation',
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-300/10',
  },
]

const ProModal = () => {
  const proModal = useProModal()

  const [isLoading, setIsLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-4 pb-2'>
            <div className='flex gap-1 items-center font-bold py-1'>
              Upgrade to Everyday
              <Badge
                variant='pro'
                className='uppercase text-sm py-1'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className='p-4 border-black/5 flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                  <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                    <tool.icon className={cn('w-6 h-6', tool.color)} />
                  </div>
                  <div className='font-semibold text-sm'>{tool.label}</div>
                </div>
                <Check className='text-primary w-5 h-5' />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={onSubscribe}
            className='w-full'
            variant='pro'>
            Upgrade <Sparkles className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
