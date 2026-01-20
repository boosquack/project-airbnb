export const createUser = (user) => {
  const { avatarUrl, bio, email, firstName, id, initials, lastName, password } =
    user;

  return {
    id,
    avatarUrl,
    bio,
    email,
    firstName,
    lastName,
    initials,
    password,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
};

export const users = [
  createUser({
    id: 1,
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    bio: `Hello, I am User One, your friendly host. I have been hosting for over 5 years and I absolutely love it. Meeting new people and making their stay comfortable and memorable is my passion.
    
    I am a local here and have extensive knowledge about the city and its hidden gems. I can guide you to the best restaurants, parks, and attractions. I am always available to answer any questions or provide assistance, ensuring you have a smooth and enjoyable stay.
    
    My home is a cozy and welcoming place, meticulously maintained and equipped with all the amenities for your convenience. I believe in creating a homely atmosphere for my guests where they can relax and feel at home.
    
    I am looking forward to hosting you and providing you the best experience. Welcome to our city and enjoy your stay!`,
    email: 'demo@cosdensolutions.io',
    firstName: 'Demo',
    lastName: 'Account',
    initials: 'DA',
    password: 'cosdensolutions',
  }),
];
