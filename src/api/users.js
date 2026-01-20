import { getDatabaseTable, setDatabaseTable } from './helpers';

export const getUserById = (id) => {
  const users = getDatabaseTable('users');
  if (!users) {
    console.log('No users table found');
    return;
  }

  return users.find((user) => user.id === id);
};

export const getUser = (data) => {
  const { email, password } = data;

  const users = getDatabaseTable('users');
  if (!users) {
    console.log('No users table found');
    return;
  }

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  return user;
};

export const getUserByEmail = (email) => {
  const users = getDatabaseTable('users');
  if (!users) {
    return null;
  }
  return users.find((user) => user.email === email);
};

export const createUser = (data) => {
  const { firstName, lastName, email, password } = data;

  const users = getDatabaseTable('users') || [];

  // Generate new ID
  const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
  const newId = maxId + 1;

  // Create initials from first and last name
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const newUser = {
    id: newId,
    avatarUrl: `https://i.pravatar.cc/150?img=${newId}`,
    bio: '',
    email,
    firstName,
    lastName,
    initials,
    password,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  // Add user to database
  users.push(newUser);
  setDatabaseTable('users', users);

  return newUser;
};
