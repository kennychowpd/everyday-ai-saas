import Image from 'next/image'

interface EmptyProps {
  label: string
}

export const Empty = ({ label }: EmptyProps) => {

  return (
    <div className='h-full p-10 flex flex-col items-center justify-center'>
      <div className='relative h-32 w-32'>
        <Image
          alt='empty'
          fill
          src='/emptyChat.png'
        />
      </div>
      <p className='text-muted-foreground text-sm text-center mt-5'>{label}</p>
    </div>
  )
}
