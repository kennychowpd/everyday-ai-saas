import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'
import { MAX_FREE_COUNTS } from '@/constants'

export const increaseApiCount = async () => {
  const { userId } = auth()

  if (!userId) {
    return
  }

  const userApiCount = await prismadb.userApiCount.findUnique({
    where: {
      userId: userId,
    },
  })

  if (userApiCount) {
    await prismadb.userApiCount.update({
      where: { userId: userId },
      data: { count: userApiCount.count + 1 },
    })
  } else {
    await prismadb.userApiCount.create({ data: { userId: userId, count: 1 } })
  }
}

export const checkApiCount = async () => {
  const { userId } = auth()

  if (!userId) {
    return false
  }

  const userApiCount = await prismadb.userApiCount.findUnique({
    where: {
      userId: userId,
    },
  })

  if (!userApiCount || userApiCount.count < MAX_FREE_COUNTS) {
    return true
  } else {
    return false
  }
}

export const getApiCount = async () => {
  const { userId } = auth()

  if (!userId) {
    return 0
  }

  const userApiCount = await prismadb.userApiCount.findUnique({
    where: {
      userId,
    },
  })

  if (!userApiCount) {
    return 0
  }

  return userApiCount.count
}
