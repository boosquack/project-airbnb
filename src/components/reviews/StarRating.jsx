import { Star } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils/cn';

const StarRating = ({ value = 0, onChange, disabled = false }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating) => {
    if (!disabled && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((rating) => {
        const isFilled = rating <= (hoverValue || value);
        return (
          <button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            disabled={disabled}
            className={cn(
              'p-0.5 transition-transform hover:scale-110 focus:outline-none',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <Star
              className={cn(
                'h-6 w-6 transition-colors',
                isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-transparent text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export { StarRating };
