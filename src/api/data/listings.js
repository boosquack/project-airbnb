import { addDays, startOfDay } from 'date-fns';

const startOfToday = startOfDay(new Date());

export const createListing = (listing) => {
  const {
    availability,
    description,
    guestFavorite,
    id,
    maxGuests,
    name,
    locationId,
    images,
    price,
    rating,
    userId,
  } = listing;

  return {
    id,
    name,
    description,
    locationId,
    images,
    availability,
    maxGuests,
    price,
    rating,
    guestFavorite,
    userId,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
};

export const isListingAvailable = (listing, dates) => {
  const { availability } = listing;
  const availableFrom = new Date(availability.from);
  const availableTo = new Date(availability.to);
  const { from: checkIn, to: checkOut } = dates;

  // If there are no bounds, return true
  if (!checkIn && !checkOut) {
    return true;
  }

  // Handles check-in only
  if (checkIn && !checkOut) {
    return checkIn >= availableFrom && checkIn <= availableTo;
  }

  // Handles check-out only
  if (!checkIn && checkOut) {
    return checkOut <= availableTo && checkOut >= availableFrom;
  }

  return availableFrom <= checkIn && availableTo >= checkOut;
};

export const listings = [
  createListing({
    id: 1,
    name: 'Cozy Apartment in London',
    description: `This beautiful and spacious apartment is located in the heart of London, just a stone's throw away from all the major attractions and landmarks. With its modern and stylish decor, this apartment is the perfect choice for anyone looking for a comfortable and convenient stay in the city.

The apartment features a large living room with plenty of natural light, a fully equipped kitchen with all the necessary appliances, and a cozy bedroom with a comfortable bed and high-quality linens. The bathroom is modern and clean, with a large shower and plenty of towels provided.

With its central location, modern amenities, and comfortable furnishings, this apartment is sure to make your stay in London a memorable one. Book now and experience the best that the city has to offer!`,
    locationId: 1,
    images: [
      'listing1-1.jpg',
      'listing1-2.jpg',
      'listing1-3.jpg',
      'listing1-4.jpg',
      'listing1-5.jpg',
      'listing1-6.jpg',
      'listing1-7.jpg',
    ],
    rating: 4.5,
    price: 100,
    maxGuests: 4,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 7),
    },
    userId: 1,
  }),
  createListing({
    id: 2,
    name: 'Charming Studio in Paris',
    description: `This charming studio is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The studio is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The studio is equipped with a TV, a DVD player, and a washing machine.

    Another thing to note is that the studio is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.`,
    locationId: 2,
    images: [
      'listing2-1.jpg',
      'listing2-2.jpg',
      'listing2-3.jpg',
      'listing2-4.jpg',
      'listing2-5.jpg',
      'listing2-6.jpg',
      'listing2-7.jpg',
    ],
    rating: 4.8,
    price: 120,
    maxGuests: 2,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 14),
    },
    userId: 1,
  }),
  createListing({
    id: 3,
    name: 'Spacious House in London',
    description: `This spacious house is located in the heart of London, just a few minutes' walk from the nearest metro station. It has a large living room with a fireplace, a fully equipped kitchen, and a dining area. The house has three bedrooms and two bathrooms.

    The house is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.

    One of the bedrooms has a double bed, while the other two have twin beds. The house is equipped with a TV, a DVD player, and a washing machine.

    If you need any help during your stay, we will be happy to assist you. We look forward to welcoming you to London!`,
    locationId: 1,
    images: [
      'listing3-1.jpg',
      'listing3-2.jpg',
      'listing3-3.jpg',
      'listing3-4.jpg',
      'listing3-5.jpg',
      'listing3-6.jpg',
      'listing3-7.jpg',
    ],
    rating: 4.2,
    price: 150,
    maxGuests: 6,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 21),
    },
    userId: 1,
  }),
  createListing({
    id: 4,
    name: 'Stylish Loft in Paris',
    description: `This stylish loft is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The loft is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The loft is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The loft is equipped with a TV, a DVD player, and a washing machine.`,
    locationId: 2,
    images: [
      'listing4-1.jpg',
      'listing4-2.jpg',
      'listing4-3.jpg',
      'listing4-4.jpg',
      'listing4-5.jpg',
      'listing4-6.jpg',
      'listing4-7.jpg',
    ],
    rating: 4.1,
    price: 80,
    maxGuests: 8,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 28),
    },
    userId: 1,
  }),
  createListing({
    id: 5,
    name: 'Modern Apartment in London',
    description: `This modern apartment is located in the heart of London, just a few minutes' walk from the nearest metro station. It has a large living room with a fireplace, a fully equipped kitchen, and a dining area. The apartment has two bedrooms and two bathrooms.

    The apartment is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.

    If you need any help during your stay, we will be happy to assist you. We look forward to welcoming you to London!`,
    locationId: 1,
    images: [
      'listing5-1.jpg',
      'listing5-2.jpg',
      'listing5-3.jpg',
      'listing5-4.jpg',
      'listing5-5.jpg',
      'listing5-6.jpg',
      'listing5-7.jpg',
    ],
    rating: 3.8,
    price: 90,
    maxGuests: 4,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 7),
    },
    userId: 1,
  }),
  createListing({
    id: 6,
    name: 'Cozy Cottage in Paris',
    description: `This cozy cottage is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    One of the many advantages of this cottage is that it is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.

    The cottage is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The cottage is equipped with a TV, a DVD player, and a washing machine.`,
    locationId: 2,
    images: [
      'listing6-1.jpg',
      'listing6-2.jpg',
      'listing6-3.jpg',
      'listing6-4.jpg',
      'listing6-5.jpg',
      'listing6-6.jpg',
      'listing6-7.jpg',
    ],
    rating: 4.3,
    price: 110,
    maxGuests: 16,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 14),
    },
    userId: 1,
  }),
  createListing({
    id: 7,
    name: 'Luxury Villa in London',
    description: `This beautiful and spacious villa is located in the heart of London, just a stone's throw away from all the major attractions and landmarks. With its modern and stylish decor, this villa is the perfect choice for anyone looking for a comfortable and convenient stay in the city.

The villa features a large living room with plenty of natural light, a fully equipped kitchen with all the necessary appliances, and a cozy bedroom with a comfortable bed and high-quality linens. The bathroom is modern and clean, with a large shower and plenty of towels provided.

Located just a few minutes' walk from the nearest metro station, this villa is perfectly situated for exploring all that London has to offer. Whether you're here for business or pleasure, this villa is the ideal base for your stay in the city.

With its central location, modern amenities, and comfortable furnishings, this villa is sure to make your stay in London a memorable one. Book now and experience the best that the city has to offer!`,
    locationId: 1,
    images: [
      'listing7-1.jpg',
      'listing7-2.jpg',
      'listing7-3.jpg',
      'listing7-4.jpg',
      'listing7-5.jpg',
      'listing7-6.jpg',
      'listing7-7.jpg',
    ],
    rating: 4.7,
    price: 100,
    maxGuests: 20,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 21),
    },
    userId: 1,
  }),
  createListing({
    id: 8,
    name: 'Charming Houseboat in Paris',
    description: `This charming houseboat is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The houseboat is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The houseboat is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The houseboat is equipped with a TV, a DVD player, and a washing machine.`,
    locationId: 2,
    images: [
      'listing8-1.jpg',
      'listing8-2.jpg',
      'listing8-3.jpg',
      'listing8-4.jpg',
      'listing8-5.jpg',
      'listing8-6.jpg',
      'listing8-7.jpg',
    ],
    rating: 4.6,
    price: 120,
    maxGuests: 10,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 28),
    },
    userId: 1,
  }),
  createListing({
    id: 9,
    name: 'Sunny Apartment in London',
    description: `This spacious apartment is located in the heart of London, just a few minutes' walk from the nearest metro station. It has a large living room with a fireplace, a fully equipped kitchen, and a dining area. The apartment has three bedrooms and two bathrooms.

    The apartment is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.

    One of the bedrooms has a double bed, while the other two have twin beds. The apartment is equipped with a TV, a DVD player, and a washing machine.

    If you need any help during your stay, we will be happy to assist you. We look forward to welcoming you to London!`,
    locationId: 1,
    images: [
      'listing9-1.jpg',
      'listing9-2.jpg',
      'listing9-3.jpg',
      'listing9-4.jpg',
      'listing9-5.jpg',
      'listing9-6.jpg',
      'listing9-7.jpg',
    ],
    rating: 4.4,
    price: 150,
    maxGuests: 6,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 7),
    },
    userId: 1,
  }),
  createListing({
    id: 10,
    name: 'Cozy Studio in Paris',
    description: `This stylish studio is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The studio is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The studio is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The studio is equipped with a TV, a DVD player, and a washing machine.`,
    locationId: 2,
    images: [
      'listing10-1.jpg',
      'listing10-2.jpg',
      'listing10-3.jpg',
      'listing10-4.jpg',
      'listing10-5.jpg',
      'listing10-6.jpg',
      'listing10-7.jpg',
    ],
    rating: 4.0,
    price: 80,
    maxGuests: 2,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 14),
    },
    userId: 1,
  }),
  createListing({
    id: 11,
    name: 'Spacious House in London',
    description: `This modern house is located in the heart of London, just a few minutes' walk from the nearest metro station. It has a large living room with a fireplace, a fully equipped kitchen, and a dining area. The house has two bedrooms and two bathrooms.

    The house is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.

    If you need any help during your stay, we will be happy to assist you. We look forward to welcoming you to London!`,
    locationId: 1,
    images: [
      'listing11-1.jpg',
      'listing11-2.jpg',
      'listing11-3.jpg',
      'listing11-4.jpg',
      'listing11-5.jpg',
      'listing11-6.jpg',
      'listing11-7.jpg',
    ],
    rating: 4.9,
    price: 90,
    maxGuests: 4,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 21),
    },
    userId: 1,
  }),
  createListing({
    id: 12,
    name: 'Stylish Loft in Paris',
    description: `This cozy loft is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    One of the many advantages of this loft is that it is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.

    The loft is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The loft is equipped with a TV, a DVD player, and a washing machine.`,
    locationId: 2,
    images: [
      'listing12-1.jpg',
      'listing12-2.jpg',
      'listing12-3.jpg',
      'listing12-4.jpg',
      'listing12-5.jpg',
      'listing12-6.jpg',
      'listing12-7.jpg',
    ],
    rating: 4.5,
    price: 110,
    maxGuests: 8,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 28),
    },
    userId: 1,
  }),
];
