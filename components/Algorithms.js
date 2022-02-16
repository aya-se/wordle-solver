import Words from '/public/words_dictionary.json';

export const simpleAlgorithm = (greens, yellows, grays) => {
  console.log(grays);
  let wordles = Object.keys(JSON.parse(JSON.stringify(Words))).filter(
    (value) => {
      return value.length === 5;
    }
  );
  wordles = wordles.filter(
    (value) => {
      for(let j=0; j<5; j++) {
        const idx = value[j].toUpperCase().charCodeAt(0)-65;
        for(let i=0; i<26;i++) {
          if (greens[i]===j && idx!==i) return false;
          // yellowな文字を含んでいるか？
          if (yellows[i][j]) {
            const str = String.fromCharCode(65+i).toLowerCase();
            if (value.includes(str) === false) {
              return false;
            }
          }
        }
        if (grays[idx]) return false;
        if (yellows[idx][j]) return false;
      }
      return true;
    }
  )
  console.log(wordles);
  return wordles;
};
