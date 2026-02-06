import ListingCard from '@/components/ListingCard';
import type { ListingWithLocation } from '@/types';

interface ListingListProps {
  listings: ListingWithLocation[];
}

const ListingList = ({ listings }: ListingListProps) => {
  if (listings.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingList;
