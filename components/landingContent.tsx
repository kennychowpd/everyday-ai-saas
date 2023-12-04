'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
  {
    name: 'Kenny',
    avatar: 'K',
    title: 'Software Engineer',
    description: 'Easy to use!',
  },
  {
    name: 'Adora',
    avatar: 'A',
    title: 'Concept Artist',
    description: 'I never knew I can also create with generative AI until now.',
  },
  {
    name: 'Sam',
    avatar: 'S',
    title: 'Writer',
    description: 'This help me write faster than ever!',
  },
];

export const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10'>Testimonials</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {testimonials.map((item) => (
          <Card key={item.description} className='bg-zinc-800 border-none text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <div>
                  <p className='text-lg'>{item.name}</p>
                  <p className='text-zinc-400 text-sm'>{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className='pt-4 px-0'>{item.description}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
