import { useParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import useFetch from '@/hooks/useFetch';
import type { ListingWithLocation } from '@/types';

const ListingDetailsPage = () => {
  const { listingId } = useParams<{ listingId: string }>();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch<ListingWithLocation>(`/api/listings/${listingId}`);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
