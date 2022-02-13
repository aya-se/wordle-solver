import Head from 'next/head';

export default function Feature() {
  return (
    <div className="container my-3">
      <Head>
        <title>Feature</title>
      </Head>
      <h2>アルゴリズム概要</h2>
      <p>Wordle Solverのアルゴリズムについて簡単に紹介します。</p>
      <h4>シンプルなアルゴリズム (simple)</h4>
      <p>非常に単純な方法で単語を推薦します。</p>
    </div>
  );
}
