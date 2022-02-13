import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [letters, setLetters] = useState(Array(30).fill(''));
  const [letterIdx, setLetterIdx] = useState(0);
  const onClickLetter = (str) => {
    if (letterIdx === 30) return;
    setLetters(
      letters.map((letter, index) => (index === letterIdx ? str : letter))
    );
    setLetterIdx(letterIdx+1);
  };
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
                  key={i + '-' + j}
                  type="button"
                  className="btn btn-letter"
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
                onClick={() => onClickLetter(i)}
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
                onClick={() => onClickLetter(i)}
              >
                {i}
              </button>
            ))}
          </div>
          <div id="keyboards-row2" className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-keyboard btn-keyboard-lg"
              onClick={() => onClickEnter(i)}
            >
              ENTER
            </button>
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((i) => (
              <button
                key={i}
                id={i}
                type="button"
                className="btn btn-keyboard"
                onClick={() => onClickLetter(i)}
              >
                {i}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-keyboard btn-keyboard-lg"
              onClick={() => onClickDelete(i)}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
