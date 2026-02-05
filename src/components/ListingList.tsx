import ListingCard from '@/components/ListingCard';
import type { ListingWithLocation } from '@/types';

interface ListingListProps {
  listings: ListingWithLocation[];
}

const ListingList = ({ listings }: ListingListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default ListingList;
