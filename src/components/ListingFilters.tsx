import { CalendarDays, Search, Users } from 'lucide-react';
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-3 max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          className="pl-12 h-12 text-base rounded-full border-2 bg-background"
          placeholder="Search destinations, properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Date Picker */}
      <div className="flex items-center gap-2 bg-background rounded-full border-2 border-input px-4 h-12">
        <CalendarDays className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <DateRangePicker
          value={dates}
          onChange={setDates}
          minDate={new Date()}
          placeholder="Add dates"
          className="border-0 h-auto py-0 px-0 focus:ring-0 bg-transparent"
        />
      </div>

      {/* Guest Stepper */}
      <div className="flex items-center gap-2 bg-background rounded-full border-2 border-input px-4 h-12">
        <Users className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <Stepper
          label="guest"
          value={guests}
          onChange={setGuests}
          className="border-0"
        />
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSubmit}
        size="lg"
        className="h-12 px-8 rounded-full gap-2"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </div>
  );
};

export default memo(ListingFilters);
