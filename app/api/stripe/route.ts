import prismadb from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'
import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

const settingsUrl = absoluteUrl('/settings')

export async function GET() {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (!user || !userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId: userId },
    })

    if (userSubscription && userSubscription.stripeCostomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCostomerId,
        return_url: settingsUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Everyday AI Pro',
              description: 'Unlimited Ai Generaions',
            },
            unit_amount: 2000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: { userId },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log('[STRIPE_ERROR]', error)
  }
}
