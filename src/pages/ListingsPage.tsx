import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
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
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      {/* Hero Section with Filters */}
      <div className="bg-background border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-3">
              Find your perfect stay
            </h1>
            <p className="text-muted-foreground">
              Browse {listings.length > 0 ? `${listings.length}+ ` : ''}unique properties from trusted hosts
            </p>
          </div>
          <ListingFilters onChange={handleFilters} initialSearch={initialSearch} />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-10">
        <DataRenderer error={error} isLoading={status === 'loading'}>
          {listings.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{listings.length}</span> places to stay
                  {filters.search && (
                    <span> matching "<span className="text-primary">{filters.search}</span>"</span>
                  )}
                </p>
              </div>
              <ListingList listings={listings} />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">No listings found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </div>
          )}
        </DataRenderer>
      </div>
    </div>
  );
};

export default ListingsPage;
