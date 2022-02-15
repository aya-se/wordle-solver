import Words from "/public/words_dictionary.json";
import React, {useState, useEffect} from 'react';

export default function WordList() {
  const [words,setWords] = useState([]);

  // Wordリストの初期設定
  useEffect(()=>{
    // wordles: Wordle上で対象になり得る単語のリスト
    const wordles = Object.keys(JSON.parse(JSON.stringify(Words))).filter ((value) => {
      return value.length === 5;
    });
    setWords(wordles.slice(0,100));
    //setWords(wordles);
  },[])
  
  return (
    <div className="my-3">
      <h2>WORD LIST</h2>
      <div className="text-center">
        {words.map((key) => (
          <p key={key}>{key}</p>
        ))}
      </div>
    </div>
  );
}
