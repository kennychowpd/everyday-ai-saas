'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('011d4d37-9558-4cd4-9b9c-0fe7e7a54eee')
  }, [])

  return null
}
