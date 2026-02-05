import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { fetchListings } from '@/state/listings/listingsSlice';
import type { AppDispatch, RootState } from '@/state/store';
import type { ListingFilters as ListingFiltersType } from '@/types';

const ListingsPage = () => {
  const { listings, error, status } = useSelector((state: RootState) => state.listings);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<ListingFiltersType>({
    dates: undefined,
    guests: 0,
    search: initialSearch,
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));

    return () => {
      request.abort();
    };
  }, [dispatch, fetchOptions]);

  const handleFilters = useCallback((newFilters: ListingFiltersType) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} initialSearch={initialSearch} />
        <Separator className='my-4' />
      </div>
      <DataRenderer error={error} isLoading={status === 'loading'}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default ListingsPage;
