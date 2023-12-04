'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';
import { Code2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './constants';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { Empty } from '@/components/emptyChat';
import { Loader } from '@/components/chatLoader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import ReactMarkdown from 'react-markdown';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-hot-toast';
import { ChatCompletionMessageParam, ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';

const CodeGenerationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/code', {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Code Generation'
        description='Generate code using descriptive text'
        icon={Code2}
        iconColor='text-yellow-400'
        bgColor='bg-yellow-400/10'
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
                      placeholder='Simple toggle button using react hooks.'
                      disabled={isLoading}
                      className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
              Send
            </Button>
          </form>
        </Form>
        <div className='space-y-4 mt-4'>
          {isLoading ? (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          ) : null}
          {messages.length === 0 && !isLoading ? (
            <Empty label='No exisiting messages' />
          ) : (
            <div className='flex flex-col-reverse gap-y-4'>
              {messages.map((message) => (
                <div
                  key={messages.indexOf(message)}
                  className={cn(
                    'p-8 w-full flex items-start gap-x-8 rounded-lg',
                    message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                  )}>
                  {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}

                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className='overflow-auto w-full my-2 bg-black/10 px-6 py-4 rounded-lg'>
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => <code className='bg-black/10 p-1 rounded-lg' {...props} />,
                    }}
                    className='text-sm overflow-hidden leading-7'>
                    {(message.content as string) || ''}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeGenerationPage;
