export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

export const getUniqueItem = (items) => {
  let b = getRandomElement(items);
  items.splice(items.indexOf(b), 1);
  return b;
};

