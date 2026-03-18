import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  children: React.ReactNode
}

const variantStyles = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 shadow-sm',
  secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-300',
  outline: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50 active:bg-blue-100',
  ghost: 'text-blue-700 hover:bg-blue-50 active:bg-blue-100',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
