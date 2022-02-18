import Words from '/public/words_dictionary.json';

export const simpleAlgorithm = (greens, yellows, grays) => {
  let wordles = Object.keys(JSON.parse(JSON.stringify(Words))).filter(
    (value) => {
      return value.length === 5;
    }
  );
  const frequencies = [8.17, 1.49, 2.78, 4.25, 12.7, 2.23, 2.02, 6.09, 6.97, 0.15, 0.77, 4.03, 2.41, 6.75, 7.51, 1.93, 0.10, 5.99, 6.33, 9.06, 2.76, 0.98, 2.36, 0.15, 1.97, 0.07];

  wordles = wordles.filter(
    (value) => {
      for(let j=0; j<5; j++) {
        const idx = value[j].toUpperCase().charCodeAt(0)-65;
        for(let i=0; i<26;i++) {
          // その列に他のgreenな文字が指定されていればNG
          if (greens[i][j] && i!==idx) return false;
          // yellowな文字を含んでいるか？
          if (yellows[i][j]) {
            const str = String.fromCharCode(65 + i).toLowerCase();
            if (value.includes(str) === false) {
              return false;
            }
          }
        }
        // grayなはずの文字がその列に存在したらNG
        if (grays[idx][j]) return false;
        // yellowなはずの文字がまさにその列に存在したらNG
        if (yellows[idx][j]) return false;
      }
      return true;
    }
  )
  wordles.sort( (a,b) => {
    let scoreA = 0; let scoreB = 0;
    let mapA = Array(26).fill(0); let mapB = Array(26).fill(0);
    for (let i = 0; i < 5; i++) {
      mapA[a[i].toUpperCase().charCodeAt(0) - 65]++;
      mapB[b[i].toUpperCase().charCodeAt(0) - 65]++;
    }
    for (let i=0; i<26; i++) {
      if (mapA[i] > 0) scoreA += frequencies[i] * (mapA[i] ** (1 / 4));
      if (mapB[i] > 0) scoreB += frequencies[i] * (mapB[i] ** (1 / 4));
    }
    return scoreB - scoreA;
  })
  return wordles;
};
