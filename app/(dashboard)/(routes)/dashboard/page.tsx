'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { ArrowRight, Code2, ImageIcon, MessageSquare, Music, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const tools = [
    {
      label: 'Chat',
      icon: MessageSquare,
      href: '/chat',
      color: 'text-lime-500',
      bgColor: 'bg-lime-500/10',
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      href: '/image-generation',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    // {
    //   label: 'Video Generation',
    //   icon: Video,
    //   href: '/video-generation',
    //   color: 'text-orange-500',
    //   bgColor: 'bg-orange-500/10',
    // },
    {
      label: 'Music Generation',
      icon: Music,
      href: '/music-generation',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Code Generation',
      icon: Code2,
      href: '/code-generation',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-300/10',
    },
  ];

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>Experience the power of AI</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Do everything better and faster - AI powers in your hands
        </p>
      </div>
      <div className='px-4 my-20 md:px-20 lg:px-32 flex flex-wrap'>
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className='p-4 border-black/5 w-1/2 h-full flex items-center justify-between hover:shadow-md transition cursor-pointer'>
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>
              <div className='font-semibold'>{tool.label}</div>
            </div>
            <ArrowRight className='w-5 h-5' />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
