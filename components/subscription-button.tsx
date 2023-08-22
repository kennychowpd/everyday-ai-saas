'use client'

import { Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      toast.error('something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      variant={isPro ? 'default' : 'pro'}>
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Sparkles className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}
