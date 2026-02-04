import { format } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';

import { StarRatingDisplay } from './StarRatingDisplay';

const ReviewCard = ({ review, user }) => {
  const { rating, comment, createdAt } = review;

  const formattedDate = createdAt
    ? format(new Date(createdAt), 'MMMM d, yyyy')
    : '';

  return (
    <div className="flex flex-col gap-3 border-b border-border pb-4 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
            <AvatarFallback>{user?.initials || '?'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-sm text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
        <StarRatingDisplay rating={rating} size="sm" />
      </div>
      <p className="text-sm text-foreground leading-relaxed">{comment}</p>
    </div>
  );
};

export { ReviewCard };
