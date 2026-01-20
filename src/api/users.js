import { getDatabaseTable } from './helpers';

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
