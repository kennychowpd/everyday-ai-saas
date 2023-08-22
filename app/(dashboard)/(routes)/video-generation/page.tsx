'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Heading } from '@/components/ui/heading'
import { Video } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constants'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { Empty } from '@/components/emptyChat'
import { Loader } from '@/components/chatLoader'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'react-hot-toast'

const VideoGenerationPage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [video, setVideo] = useState<string>('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo('')

      const response = await axios.post('/api/video', values)

      setVideo(response.data)
      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error('Something went wrong')
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title='Video Generation'
        description='Turn your words into video.'
        icon={Video}
        iconColor='text-orange-500'
        bgColor='bg-orange-500/10'
      />
      <div className='px-4 lg:px-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className='rounded-lg border w-full py-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
            <FormField
              control={form.control}
              name='prompt'
              render={({ field }) => (
                <FormItem className='col-span-12'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      placeholder='Squirrel jumping between trees'
                      disabled={isLoading}
                      className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='col-span-12 lg:col-span-2 w-full'
              disabled={isLoading}>
              Send
            </Button>
          </form>
        </Form>
        <div className='space-y-4 mt-4'>
          {isLoading ? (
            <div className='gap-4 flex-col p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
              <p className='text-sm text-muted-foreground text-center'>
                Might take up to a minute for the first generation of a session,
                thank you for your patience!
              </p>
            </div>
          ) : null}
          {!video && !isLoading && <Empty label='No video generated' />}
          {video && (
            <video
              controls
              className='w-full mt-8 aspect-video rounded-lg border bg-black'>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoGenerationPage
