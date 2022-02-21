import React, { useState, useEffect } from 'react';
import styles from '../styles/Blob.module.scss';
import Image from 'next/image';
export default function Blob(props) {
  const [blob, setBlob] = useState('/blob_pyon.gif');
  const [Balloon, setBalloon] = useState("");
  const blobComments = [
    "最初はこれらの単語がおすすめだよ。",
    "順調なすべり出し！今日はハイスコアが狙えるかも？",
    "この調子で頑張ろう！",
    "正解にかなり近づいてきたね！あともう少し！",
    "正解の候補はあとわずか！ここは一発決めちゃいましょう！",
    "うーん……、なかなか手がかりが見つからないね……。",
    "あれれ……？？答えになりそうな単語が思い浮かばない……。",
    "な、なんと！！1発で正解！！！すごすぎる！！！",
    "2回目で正解！？今日はかなりツイてるかも？？",
    "3回目で正解！！なかなかの結果！！",
    "正解おめでとう！明日も頑張ろう！",
    "ギリギリでクリア！あ、危なかった～～。",
    "うーん……、残念。まぁこんな日もあるよね。",
    "今日のWordleはどんな問題かな……？",
    "まだまだこれからが本番！次の単語は……。",
    "うーん……、なかなか厳しい。ここが踏ん張りどころ。"
  ]
  // Enter時の処理
  useEffect(() => {
    setBlobBalloon(true);
  }, [props.words]);

  const setBlobBalloon = (status) => {
    if (!status) {
      //setBlob('/blob.png');
      //setBalloon('');
    } else {
      const prog = props.words.length;
      if (props.letterIdx === 0) {
        if (prog === 0) {
          setBlob('/blob_pyon.gif');
          setBalloon(blobComments[13]);
        }else {
          setBlob('/blob_pyon.gif');
          setBalloon(blobComments[0]);
        }
      } else if(props.isFailed) {
        setBlob('/blobsadcry.gif');
        setBalloon(blobComments[12]);
      } else if (prog === 0) {
        setBlob('/blob_sad.gif');
        setBalloon(blobComments[6]);
      } else if (props.isSuccessed) {
        if (props.letterIdx <= 5) {
          setBlob('/hyperblob.gif');
          setBalloon(blobComments[7]);
        } else if (props.letterIdx <= 10) {
          setBlob('/blobmeltsoblove.gif');
          setBalloon(blobComments[8]);
        } else if (props.letterIdx <= 15) {
          setBlob('/blob_bongo.gif');
          setBalloon(blobComments[9]);
        } else if (props.letterIdx <= 25) {
          setBlob('/blobwobwork.gif');
          setBalloon(blobComments[10]);
        } else if (props.letterIdx <= 30) {
          setBlob('/blobtoiletflush.gif');
          setBalloon(blobComments[11]);
        }
      } else if (props.letterIdx <= 5) {
        if (prog <= 500) {
          setBlob('/blobcaramelldansen.gif');
          setBalloon(blobComments[1]);
        } else {
          setBlob('/blob_pyon.gif');
          setBalloon(blobComments[2]);
        }
      } else if (props.letterIdx <= 25) {
        if (prog <= 10) {
          setBlob('/conga_party_thinking_blob.gif');
          setBalloon(blobComments[4]);
        } else if (prog <= 100) {
          setBlob('/blob_bongo.gif');
          setBalloon(blobComments[3]);
        } else if (props.letterIdx >= 20 && prog >= 200) {
          setBlob('/blob_thinking_fast.gif');
          setBalloon(blobComments[15]);
        } else if (props.letterIdx >= 15 && prog >= 500) {
          setBlob('/blob_thinking.gif');
          setBalloon(blobComments[5]);
        } else {
          setBlob('/blobenjoy.gif');
          setBalloon(blobComments[14]);
        }
      }
    }
  }
  return (
    <div className="d-flex justify-content-left">
      <Image
        className={styles.blob}
        src={blob}
        alt="blob"
        width={50}
        height={50}
        onMouseOver={() => setBlobBalloon(true)}
        onMouseOut={() => setBlobBalloon(false)}
      ></Image>
      {Balloon !== '' && (
        <div className={styles.balloon}>
          {Balloon}
        </div>
      )}
    </div>
  );
}
