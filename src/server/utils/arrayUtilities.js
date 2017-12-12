import { randomNumber } from "./numberUtilities";

export const shuffle = (array) => {
  let index = array.length,
      result = [];

  while (index !== 0) {
    const randomIndex = randomNumber(0, array.length);
    const value = array.splice(randomIndex, 1)[0];
    index--;
    result.push(value);
  }

  return result;
}

export const arrayOfSize = (size, mapper) => Array.from(Array(size).keys()).map(mapper);
