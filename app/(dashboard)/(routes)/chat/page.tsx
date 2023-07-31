'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Heading } from '@/components/ui/heading'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constants'
import { Button } from '@/components/ui/button'

const ChatPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div>
      <Heading
        title='Chat'
        description='Our most advanced Chat model.'
        icon={MessageSquare}
        iconColor='text-lime-500'
        bgColor='bg-lime-500/10'
      />
      <div className='px-4 lg:px-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
            <FormField
              control={form.control}
              name='prompt'
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-10'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      placeholder='Who is the tallest person in the world?'
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
              className='col-span-12 lg:col-span-2'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ChatPage
