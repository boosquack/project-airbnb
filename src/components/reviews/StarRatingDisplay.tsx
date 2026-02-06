import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

type Size = 'sm' | 'default' | 'lg';

interface StarRatingDisplayProps {
  rating?: number;
  size?: Size;
  showValue?: boolean;
}

const StarRatingDisplay = ({
  rating,
  size = 'default',
  showValue = true,
}: StarRatingDisplayProps) => {
  const sizes: Record<Size, string> = {
    sm: 'h-3 w-3',
    default: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes: Record<Size, string> = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  const starSize = sizes[size] || sizes.default;
  const textSize = textSizes[size] || textSizes.default;

  return (
    <div className="flex items-center gap-1">
      <Star className={cn(starSize, 'fill-yellow-400 text-yellow-400')} />
      {showValue && (
        <span className={cn(textSize, 'font-medium')}>
          {rating?.toFixed(1) || '0.0'}
        </span>
      )}
    </div>
  );
};

export { StarRatingDisplay };
