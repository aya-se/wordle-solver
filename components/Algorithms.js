import Words from '/public/words_dictionary.json';

// 定数
const frequencies = [
  8.17, 1.49, 2.78, 4.25, 12.7, 2.23, 2.02, 6.09, 6.97, 0.15, 0.77, 4.03, 2.41,
  6.75, 7.51, 1.93, 0.1, 5.99, 6.33, 9.06, 2.76, 0.98, 2.36, 0.15, 1.97, 0.07,
];

// 条件に合致するワードリストを計算する共通の関数
const wordleFilter=(wordles, greens, yellows, grays) => {
  return wordles.filter(
    (value) => {
      for(let j = 0; j < 5; j++) {
        const idx = value[j].toUpperCase().charCodeAt(0)-65;
        for(let i = 0; i < 26; i++) {
          // その列に他のgreenな文字が指定されていればNG
          if (greens[i][j] && i!==idx) return false;
          // yellowな文字を含んでいなければNG
          if (yellows[i][j]) {
            const str = String.fromCharCode(65 + i).toLowerCase();
            if (!value.includes(str)) return false;
          }
          // grayな文字を含んでいたらNG
          if (grays[i][j]) {
            const str = String.fromCharCode(65 + i).toLowerCase();
            for (let k = 0; k < 5; k++)
              if (value[k] === str && !greens[i][k]) return false;
          }
        }
        // yellowなはずの文字がまさにその列に存在したらNG
        if (yellows[idx][j]) return false;
      }
      return true;
    });
}

// シンプルなアルゴリズム
export const simpleAlgorithm = (greens, yellows, grays) => {
  let wordles = Object.keys(JSON.parse(JSON.stringify(Words))).filter(
    (value) => {
      return value.length === 5;
    }
  );
  
  wordles = wordleFilter(wordles, greens, yellows, grays);

  wordles.sort( (a,b) => {
    let scoreA = 0; let scoreB = 0;
    let mapA = Array(26).fill(0); let mapB = Array(26).fill(0);
    for (let i = 0; i < 5; i++) {
      mapA[a[i].toUpperCase().charCodeAt(0) - 65]++;
      mapB[b[i].toUpperCase().charCodeAt(0) - 65]++;
    }
    for (let i=0; i<26; i++) {
      if (mapA[i] > 0) scoreA += frequencies[i] * (mapA[i] ** (1 / 2));
      if (mapB[i] > 0) scoreB += frequencies[i] * (mapB[i] ** (1 / 2));
    }
    return scoreB - scoreA;
  })

  return wordles;
};

// 安全志向アルゴリズム
export const safetyAlgorithm = (greens, yellows, grays) => {
  let wordles = Object.keys(JSON.parse(JSON.stringify(Words))).filter(
    (value) => {
      return value.length === 5;
    }
  );

  wordles = wordleFilter(wordles, greens, yellows, grays);

  wordles.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    let mapA = Array(26).fill(0);
    let mapB = Array(26).fill(0);
    for (let i = 0; i < 5; i++) {
      mapA[a[i].toUpperCase().charCodeAt(0) - 65]++;
      mapB[b[i].toUpperCase().charCodeAt(0) - 65]++;
    }
    for (let i = 0; i < 26; i++) {
      if (mapA[i] > 0) scoreA += frequencies[i] * mapA[i] ** (1 / 2);
      if (mapB[i] > 0) scoreB += frequencies[i] * mapB[i] ** (1 / 2);
    }
    return scoreB - scoreA;
  });

  return wordles;
};
