import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { checkApiCount, increaseApiCount } from '@/lib/api-count'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || '',
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, duration } = body

    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 })
    }

    const freeTrial = await checkApiCount()

    if (!freeTrial) {
      return new NextResponse('Free trial has expired', { status: 403 })
    }

    const response = await replicate.run(
      'facebookresearch/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906',
      {
        input: {
          model_version: 'melody',
          prompt: prompt,
          duration: parseInt(duration, 10),
        },
      }
    )

    await increaseApiCount()

    return NextResponse.json(response)
  } catch (error) {
    console.log('[MUSIC_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
