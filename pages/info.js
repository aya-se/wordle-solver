import Head from 'next/head';

export default function Info() {
  return (
    <div className="container my-3">
      <Head>
        <title>Info | Wordle Solver</title>
      </Head>
      <h2>このアプリケーションは何？</h2>
      <p>Wordleを一緒に解いてくれます。</p>
    </div>
  );
}
