import Head from 'next/head';

export default function Info() {
  return (
    <div className="container my-3">
      <Head>
        <title>Info | Wordle Solver</title>
      </Head>
      <h2>このアプリケーションは何？</h2>
      <p>かわいいBlobが、あなたと一緒にWordleの答えを考えてくれます。</p>
      <h2>使用したデータについて</h2>
      <p>
        英単語のリストは
        <a className="link-underline" target="_blank" href="https://github.com/dwyl/english-words" rel="noreferrer">
          こちらのデータ
        </a>
        を利用しています。Wordleの語彙とは必ずしも一致しない為、Wordleで出題されうる全ての単語を網羅できている保証がありません。また逆に、Wordleには存在しない単語が一部含まれている場合があります。
      </p>
    </div>
  );
}
