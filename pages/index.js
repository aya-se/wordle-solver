import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

export default function Home() {
  const [colors, setColors] = useState(Array(30).fill("white"));
  const [letters, setLetters] = useState(Array(30).fill(""));
  const [letterIdx, setLetterIdx] = useState(0);

  const onClickLetter = (idx) => {
    if (letters[idx]==='') return;
    let nextColor = "white";
    if (colors[idx] === "white") nextColor = "green";
    else if (colors[idx] === "green") nextColor = "yellow";
    else if (colors[idx] === "yellow") nextColor = "gray";
    else if (colors[idx] === "gray") nextColor = 'white';
    setLetterStyle(idx, nextColor);
    setColors(
      colors.map((color, index) => (index === idx ? nextColor : color))
    );
  }

  const setLetterStyle = (idx, style) => {
    if(style === "white") {
      document.getElementById('letter-' + idx).style.backgroundColor = "white";
      document.getElementById('letter-' + idx).style.borderColor = '#D3D6DA';
      document.getElementById('letter-' + idx).style.color = 'black';
    }
    else if (style === "green") {
      document.getElementById('letter-' + idx).style.backgroundColor = '#6AAA64';
      document.getElementById('letter-' + idx).style.borderColor = '#6AAA64';
      document.getElementById('letter-' + idx).style.color = 'white';
    }
    else if (style === "yellow") {
      document.getElementById('letter-' + idx).style.backgroundColor = '#C9B458';
      document.getElementById('letter-' + idx).style.borderColor = '#C9B458';
      document.getElementById('letter-' + idx).style.color = 'white';
    }
    else if (style==="gray") {
      document.getElementById('letter-' + idx).style.backgroundColor = '#787C7E';
      document.getElementById('letter-' + idx).style.borderColor = '#787C7E';
      document.getElementById('letter-' + idx).style.color = 'white';
    }
  }

  const onClickKeyboard = (str) => {
    if (letterIdx === 30) return;
    setLetters(
      letters.map((letter, index) => (index === letterIdx ? str : letter))
    );
    setLetterIdx(letterIdx + 1);
  };

  const onClickEnter = () => {
    // 検索
  };

  const onClickDelete = () => {
    if (letterIdx === 0) return;
    setLetters(
      letters.map((letter, index) => (index === letterIdx - 1 ? '' : letter))
    );
    setLetterStyle(letterIdx - 1, 'white');
    setLetterIdx(letterIdx - 1);
  };

  const onUseRealKeyboard = useCallback((event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      onClickKeyboard(String.fromCharCode(event.keyCode));
    }
    else if (event.keyCode === 13) {
      onClickEnter();
    }
    else if (event.keyCode === 8 || event.keyCode === 46) {
      onClickDelete();
    }
  }, [onClickKeyboard, onClickEnter, onClickDelete]);

  useEffect(() => {
    document.addEventListener('keydown', onUseRealKeyboard, false);
    return () => {
      document.removeEventListener('keydown', onUseRealKeyboard, false);
    };
  }, [onUseRealKeyboard]);

  return (
    <div>
      <div className="container my-3">
        <Head>
          <title>Wordle Solver</title>
        </Head>
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
      </div>
    </div>
  );
}
