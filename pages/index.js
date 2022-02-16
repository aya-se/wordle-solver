import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import WordList from '/components/WordList';
import Words from '/public/words_dictionary.json';
import {simpleAlgorithm} from '/components/Algorithms';

export default function Home() {
  const [colors, setColors] = useState(Array(30).fill('white'));
  const [letters, setLetters] = useState(Array(30).fill(''));
  const [letterIdx, setLetterIdx] = useState(0);
  // 予測に利用する行列
  const [greens, setGreens] = useState(Array(26).fill(-1));
  const [yellows, setYellows] = useState(Array(26).fill(Array(5).fill(0)));
  const [grays, setGrays] = useState(Array(26).fill(0));
  // ワードリスト
  const [words, setWords] = useState([]);
  // Wordリストの初期設定
  useEffect(() => {
    // wordles: Wordle上で対象になり得る単語のリスト
    const wordles = Object.keys(JSON.parse(JSON.stringify(Words))).filter(
      (value) => {
        return value.length === 5;
      }
    );
    setWords(wordles.slice(0, 100));
    //setWords(wordles);
  }, []);

  // 文字ボタンクリック時の動作
  const onClickLetter = (idx) => {
    if (letters[idx] === '') return;
    let nextColor = 'white';
    if (colors[idx] === 'white' || colors[idx] === 'gray') nextColor = 'green';
    else if (colors[idx] === 'green') nextColor = 'yellow';
    else if (colors[idx] === 'yellow') nextColor = 'gray';
    let newColors = colors;
    setLetterStyle(idx, nextColor);
    newColors[idx] = nextColor;
    // 同じ列の同じ文字は設定を同期
    for (let i=idx%5; i<30; i+=5) {
      if(letters[idx] === letters[i] && idx !== i) {
        newColors[i] = nextColor;
        setLetterStyle(i, nextColor);
      }
    }
    setColors(newColors);
  };

  // 文字ボタンのスタイル・各種state更新
  const setLetterStyle = (idx, style) => {
    // colorsを更新
    setColors(
      colors.map((color, index) => (index === idx ? style : color))
    );
    // スタイルを更新
    if (style === 'white') {
      document.getElementById('letter-' + idx).style.backgroundColor = 'white';
      document.getElementById('letter-' + idx).style.borderColor = '#D3D6DA';
      document.getElementById('letter-' + idx).style.color = 'black';
    } else if (style === 'green') {
      document.getElementById('letter-' + idx).style.backgroundColor =
        '#6AAA64';
      document.getElementById('letter-' + idx).style.borderColor = '#6AAA64';
      document.getElementById('letter-' + idx).style.color = 'white';
    } else if (style === 'yellow') {
      document.getElementById('letter-' + idx).style.backgroundColor =
        '#C9B458';
      document.getElementById('letter-' + idx).style.borderColor = '#C9B458';
      document.getElementById('letter-' + idx).style.color = 'white';
    } else if (style === 'gray') {
      document.getElementById('letter-' + idx).style.backgroundColor =
        '#787C7E';
      document.getElementById('letter-' + idx).style.borderColor = '#787C7E';
      document.getElementById('letter-' + idx).style.color = 'white';
    }
  };

  // アルファベットキー入力時の動作
  const onClickKeyboard = (str) => {
    if (letterIdx === 30) return;
    setLetters(
      letters.map((letter, index) => (index === letterIdx ? str : letter))
    );
    // 同じ列の同じ文字と設定を同期
    for (let i = letterIdx % 5; i <= letterIdx; i += 5) {
      if (letters[i] === str) {
        setLetterStyle(letterIdx, colors[i]);
        break;
      }
      // 該当文字が無い場合は'gray'
      if (i === letterIdx) setLetterStyle(letterIdx, 'gray');
    }
    setLetterIdx(letterIdx + 1);
  };

  // Enterキー入力時の動作
  const onClickEnter = () => {
    // 予測行列の更新
    let newGreens = Array(26).fill(-1);
    let newYellows = Array(26).fill(Array(5).fill(0));
    let newGrays = Array(26).fill(0);
    for(let i=0; i<letterIdx; i++) {
      if (colors[i] === "green") {
        newGreens[letters[i].charCodeAt(0)-65] = i%5;
      }
      else if (colors[i] === "yellow") {
        let preYellows = Array(5).fill(0);
        for(let j=0; j<5;j++) preYellows[j] = newYellows[letters[i].charCodeAt(0) - 65][j];
        preYellows[i % 5] = 1;
        newYellows[letters[i].charCodeAt(0) - 65] = preYellows;
      }
      else if (colors[i] === "gray") {
        newGrays[letters[i].charCodeAt(0) - 65] = 1;
      }
    }
    setGreens(newGreens);
    setYellows(newYellows);
    setGrays(newGrays);
    // アルゴリズムによる計算
    setWords(simpleAlgorithm(newGreens, newYellows, newGrays));
  };

  // Deleteキー入力時の動作
  const onClickDelete = () => {
    if (letterIdx === 0) return;
    setLetters(
      letters.map((letter, index) => (index === letterIdx - 1 ? '' : letter))
    );
    setLetterStyle(letterIdx - 1, 'white');
    setLetterIdx(letterIdx - 1);
  };

  // PCキーボード入力イベント時の動作
  const onUseRealKeyboard = useCallback(
    (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        onClickKeyboard(String.fromCharCode(event.keyCode));
      } else if (event.keyCode === 13) {
        onClickEnter();
      } else if (event.keyCode === 8 || event.keyCode === 46) {
        onClickDelete();
      }
    },
    []
  );

  useEffect(() => {
    //document.addEventListener('keydown', onUseRealKeyboard, false);
    return () => {
      //document.removeEventListener('keydown', onUseRealKeyboard, false);
    };
  }, [onUseRealKeyboard]);

  return (
    <div>
      <p>{greens}</p>
      <p>{yellows}</p>
      <p>{grays}</p>
      <div className="container my-3">
        <Head>
          <title>Home | Wordle Solver</title>
        </Head>
        <div id="algorithms" className="my-3 d-flex justify-content-end">
          <select className="form-select w-50">
            <option value="1">simple</option>
            <option value="2">algorithm 2</option>
            <option value="3">algorithm 3</option>
          </select>
        </div>
        <div id="letters" className="my-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="d-flex justify-content-center">
              {[1, 2, 3, 4, 5].map((j) => (
                <button
                  key={'letter-' + ((i - 1) * 5 + (j - 1))}
                  id={'letter-' + ((i - 1) * 5 + (j - 1))}
                  type="button"
                  className="btn btn-letter"
                  onClick={() => onClickLetter((i - 1) * 5 + (j - 1))}
                >
                  {letters[(i - 1) * 5 + (j - 1)]}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div id="keyboards" className="my-3">
          <div id="keyboards-row1" className="d-flex justify-content-center">
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((i) => (
              <button
                key={i}
                id={i}
                type="button"
                className="btn btn-keyboard"
                onClick={() => onClickKeyboard(i)}
              >
                {i}
              </button>
            ))}
          </div>
          <div id="keyboards-row2" className="d-flex justify-content-center">
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((i) => (
              <button
                key={i}
                id={i}
                type="button"
                className="btn btn-keyboard"
                onClick={() => onClickKeyboard(i)}
              >
                {i}
              </button>
            ))}
          </div>
          <div id="keyboards-row2" className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-keyboard btn-keyboard-lg"
              onClick={() => onClickEnter()}
            >
              ENTER
            </button>
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((i) => (
              <button
                key={i}
                id={i}
                type="button"
                className="btn btn-keyboard"
                onClick={() => onClickKeyboard(i)}
              >
                {i}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-keyboard btn-keyboard-lg"
              onClick={() => onClickDelete()}
            >
              DELETE
            </button>
          </div>
        </div>
        <WordList words={words}/>
      </div>
    </div>
  );
}
