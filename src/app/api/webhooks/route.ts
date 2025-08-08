import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import createUser from '../../../../prisma/post/create-user'
import { use } from 'react'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    
    if (evt.type === 'user.created') {
        const user = {
            id: evt.data.id,
            email: evt.data.email_addresses[0].email_address,
            username: evt.data.username ?? null,
            imageUrl: evt.data.image_url ?? null,
        }

        console.log(use)

        await createUser(user);
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}