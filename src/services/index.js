/* eslint-disable no-plusplus */
import similirality from 'string-similarity';

// SCORING MATCHES FROM COMPARING @ARRAY WITH @STRING
export const allScores = (array, string) => {
  if (!(array instanceof Array) || !(typeof string === 'string')) return [];
  const allGuess = [];
  array.forEach((element, index) => {
    if (typeof element === 'string') {
      allGuess[index] = [];
      allGuess[index].push(element);
      allGuess[index]
        .push(similirality // GETTING SCORES
          .compareTwoStrings(element.toLocaleLowerCase(), string.toLocaleLowerCase()));
    }
  });
  return allGuess;
};

export const sortScores = (array) => {
  if (!(array instanceof Array)) return [];
  array = array.filter((element) => typeof element[1] === 'number');
  for (let row = 0; row < array.length; row++) {
    for (let col = row; col < array.length; col++) {
      if (array[row][1] < array[col][1]) {
        // SWAPPING ELEMENT
        [array[row], array[col]] = [array[col], array[row]];
      }
    }
  }
  return array;
};

// GET THE HIGHEST N SCORES FROM @ARRAY
export const highScores = (array, n) => {
  if (!(array instanceof Array) || !(typeof n === 'number')) return [];
  // ORDER THE ARRAY IN DESCENDING ORDER
  array = sortScores(array);
  // GET N SCORES FROM ARRAY
  array = array.slice(0, n);

  // REMOVING SCORES
  array.forEach((element, index) => {
    // eslint-disable-next-line prefer-destructuring
    array[index] = element[0];
  });
  return array;
};
