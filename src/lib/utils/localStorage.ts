export const setItem = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = <T>(key: string): T | undefined => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
