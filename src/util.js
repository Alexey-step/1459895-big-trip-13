export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (items) => {
  return items[getRandomInteger(0, items.length - 1)];
};

export const getUniqueItem = (items) => {
  const b = getRandomElement(items);
  items.splice(items.indexOf(b), 1);
  return b;
};

