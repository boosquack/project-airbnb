import { Search } from 'lucide-react';
import { memo, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';
import type { ListingFilters as ListingFiltersType } from '@/types';

interface ListingFiltersProps {
  onChange: (filters: ListingFiltersType) => void;
  initialSearch?: string;
}

const ListingFilters = ({
  onChange,
  initialSearch = '',
}: ListingFiltersProps) => {
  const [dates, setDates] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState(initialSearch);

  const handleSubmit = () => {
    onChange({
      dates: dates ? { from: dates.from!, to: dates.to! } : undefined,
      guests,
      search,
    });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Input
        className="w-[400px]"
        placeholder="Search destinations"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder="Add dates"
      />
      <Stepper label="guest" value={guests} onChange={setGuests} />
      <Button onClick={handleSubmit}>
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default memo(ListingFilters);
