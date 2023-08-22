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
import { Download, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountOptions, formSchema, resolutionOptions } from './constants'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { Empty } from '@/components/emptyChat'
import { Loader } from '@/components/chatLoader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'react-hot-toast'

const ImageGenerationPage = () => {
  const proModal = useProModal()
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  })

  const isLoading = form.formState.isSubmitting

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])
      const response = await axios.post('/api/image', values)
      const urls = response.data.map((image: { url: string }) => image.url)
      setImages(urls)
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
        title='Image Generation'
        description='Turn your words into any image.'
        icon={ImageIcon}
        iconColor='text-purple-500'
        bgColor='bg-purple-500/10'
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
                <FormItem className='col-span-12 lg:col-span-6'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      placeholder='A photo of a car in a garage.'
                      disabled={isLoading}
                      className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='resolution'
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <div className='p-20'>
              <Loader />
            </div>
          ) : null}
          {images.length === 0 && !isLoading && (
            <Empty label='No images generated' />
          )}
          <div className='grid grid-col-1 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
            {images.map((src) => (
              <Card
                key={src}
                className='rounded-lg overflow-hidden'>
                <div className='relative aspect-square'>
                  <Image
                    alt='Image'
                    fill
                    src={src}></Image>
                </div>
                <CardFooter className='p-2'>
                  <Button
                    variant='secondary'
                    className='w-full'
                    onClick={() => window.open(src)}>
                    <Download className='h-4 w-4 mr-2' />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerationPage
