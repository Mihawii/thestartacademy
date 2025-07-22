import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        "flex-none inline-block",
        "flex flex-col rounded-xl border border-neutral-800 bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 shadow-xl p-4 sm:p-8 w-72 sm:w-80 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/60 cursor-pointer",
        className
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 shadow-lg border-2 border-primary">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-base sm:text-lg font-bold leading-none text-white">
            {author.name}
          </h3>
          <p className="text-xs sm:text-sm text-primary font-medium">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground font-medium">
        {text}
      </p>
    </Card>
  )
} 