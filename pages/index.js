import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import WordList from '/components/WordList';
import Blob from '/components/Blob';
import {simpleAlgorithm} from '/components/Algorithms';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [colors, setColors] = useState(Array(30).fill('white'));
  const [letters, setLetters] = useState('');
  const [letterIdx, setLetterIdx] = useState(0);
  // 予測に利用する行列
  const [greens, setGreens] = useState(Array(26).fill(Array(5).fill(0)));
  const [yellows, setYellows] = useState(Array(26).fill(Array(5).fill(0)));
  const [grays, setGrays] = useState(Array(26).fill(Array(5).fill(0)));
  // ワードリスト
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(()=> {
    setIsLoading(false);
  }, [words])

  // 文字ボタンクリック時の動作
  const onClickLetter = (idx) => {
    if (letters.length <= idx) return;
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
    let newColors = colors;
    if (idx.length === undefined) {
      idx = [idx];
      style = [style];
    }
    for (let i=0; i<idx.length; i++) {
      // colorsを更新
      newColors[idx[i]] = style[i];
      // スタイルを更新
      if (style[i] === 'white') {
        document.getElementById('letter-' + idx[i]).style.backgroundColor =
          'white';
        document.getElementById('letter-' + idx[i]).style.borderColor =
          '#D3D6DA';
        document.getElementById('letter-' + idx[i]).style.color = 'black';
      } else if (style[i] === 'green') {
        document.getElementById('letter-' + idx[i]).style.backgroundColor =
          '#6AAA64';
        document.getElementById('letter-' + idx[i]).style.borderColor =
          '#6AAA64';
        document.getElementById('letter-' + idx[i]).style.color = 'white';
      } else if (style[i] === 'yellow') {
        document.getElementById('letter-' + idx[i]).style.backgroundColor =
          '#C9B458';
        document.getElementById('letter-' + idx[i]).style.borderColor =
          '#C9B458';
        document.getElementById('letter-' + idx[i]).style.color = 'white';
      } else if (style[i] === 'gray') {
        document.getElementById('letter-' + idx[i]).style.backgroundColor =
          '#787C7E';
        document.getElementById('letter-' + idx[i]).style.borderColor =
          '#787C7E';
        document.getElementById('letter-' + idx[i]).style.color = 'white';
      }
    }
    setColors(newColors);
  };

  // アルファベットキー入力時の動作
  const onClickKeyboard = (str) => {
    if (letterIdx + str.length - 1 >= 30) return;
    // 同時N文字入力に対応
    setLetters(letters + str);
    let idxs = [];
    let styles = [];
    for (let k=0; k < str.length; k++) {
      // 同じ列の同じ文字と設定を同期
      const idx = letterIdx + k;
      for (let i = idx % 5; i <= idx; i += 5) {
        if (letters[i] === str[k]) {
          idxs.push(idx);
          styles.push(colors[i]);
          break;
        }
        // 該当文字が無い場合は'gray'
        if (i === idx) {
          idxs.push(idx);
          styles.push('gray');
        }
      }
    }
    setLetterIdx((letterIdx) => {
      return letterIdx + str.length;
    });
    setLetterStyle(idxs, styles);
  };

  // Enterキー入力時の動作
  const onClickEnter = () => {
    setIsLoading(true);
    // 予測行列の更新
    let newGreens = Array(26).fill(Array(5).fill(0));
    let newYellows = Array(26).fill(Array(5).fill(0));
    let newGrays = Array(26).fill(Array(5).fill(0));
    for(let i=0; i<letterIdx; i++) {
      if (colors[i] === "green") {
        let preGreens = Array(5).fill(0);
        for (let j = 0; j < 5; j++)
          preGreens[j] = newGreens[letters[i].charCodeAt(0) - 65][j];
        preGreens[i % 5] = 1;
        newGreens[letters[i].charCodeAt(0) - 65] = preGreens;
      }
      else if (colors[i] === "yellow") {
        let preYellows = Array(5).fill(0);
        for (let j = 0; j < 5; j++)
          preYellows[j] = newYellows[letters[i].charCodeAt(0) - 65][j];
        preYellows[i % 5] = 1;
        newYellows[letters[i].charCodeAt(0) - 65] = preYellows;
      }
      else if (colors[i] === "gray") {
        let preGrays = Array(5).fill(0);
        for (let j = 0; j < 5; j++)
          preGrays[j] = newGrays[letters[i].charCodeAt(0) - 65][j];
        preGrays[i % 5] = 1;
        newGrays[letters[i].charCodeAt(0) - 65] = preGrays;
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
    setLetters(letters.slice(0, letterIdx - 1));
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
      <Head>
        <title>Wordle Solver Blob</title>
      </Head>
      <div className={styles.container + ' my-3 fade-in'}>
        <section
          id="algorithms"
          className="my-3 d-flex justify-content-between align-items-center"
        >
          <Blob letterIdx={letterIdx} words={words} />
          <select className="form-select w-25 h-50 ms-1">
            <option>simple</option>
            <option>algorithm 2</option>
            <option>algorithm 3</option>
          </select>
        </section>
        <section id="letters" className="my-3">
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
        </section>
        <section id="keyboards" className="my-3">
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
        </section>
        <WordList
          words={words}
          letterIdx={letterIdx}
          isLoading={isLoading}
          onClickKeyboard={onClickKeyboard}
          maxLength={20}
        />
      </div>
    </div>
  );
}
