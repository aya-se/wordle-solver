import Words from "/public/words_dictionary.json";
import React, {useState, useEffect} from 'react';

export default function WordList(props) {
  return (
    <div className="my-3">
      <h2>WORD LIST</h2>
      <div className="text-center">
        {props.words.slice(0,100).map((key) => (
          <p key={key}>{key}</p>
        ))}
      </div>
    </div>
  );
}
