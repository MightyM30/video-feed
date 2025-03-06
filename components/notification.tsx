import { cn } from '@/lib/utils'
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from 'react-icons/hi'

interface FormErrorProps {
  message?: string
  type: 'error' | 'success' | 'info'
}

const Notification = ({ type, message }: FormErrorProps) => {
  if (!message) return null

  const Icon =
    type === 'error'
      ? HiOutlineExclamationCircle
      : type === 'success'
        ? HiOutlineCheckCircle
        : HiOutlineInformationCircle

  return (
    <div
      className={cn(
        'flex items-center gap-x-2 rounded-md p-3 text-sm',
        type === 'error' && 'bg-red-500/15 text-red-500',
        type === 'success' && 'bg-emerald-500/15 text-emerald-500',
        type === 'info' && 'bg-primary/15 text-primary',
      )}
    >
      <Icon className='h-5 w-5' />
      <p>{message}</p>
    </div>
  )
}

export { Notification }
