import Head from 'next/head';

export default function Info() {
  return (
    <div className="container my-3">
      <Head>
        <title>Info | Wordle Solver</title>
      </Head>
      <h2>このアプリケーションは何？</h2>
      <p>Wordleを一緒に解いてくれます。</p>
      <h2>使用したデータについて</h2>
      <p>
        英単語のリストは
        <a target="_blank" href="https://github.com/dwyl/english-words" rel="noreferrer">
          こちらのデータ
        </a>
        を利用しています。Wordleで出題されうる全ての単語を網羅できている保証はありませんが、おそらく概ね揃っているでしょう。
      </p>
    </div>
  );
}
