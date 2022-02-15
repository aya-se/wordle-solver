import Head from 'next/head';

export default function Feature() {
  return (
    <div className="container my-3">
      <Head>
        <title>Feature | Wordle Solver</title>
      </Head>
      <h2>アルゴリズム概要</h2>
      <p>Wordle Solverのアルゴリズムについて簡単に紹介します。</p>
      <h4>シンプルなアルゴリズム (simple)</h4>
      <p>非常に単純な方法で単語を推薦します。</p>
      <h4>アルゴリズム その2 (algorithm 2)</h4>
      <p>アルゴリズムその2です。</p>
      <h4>アルゴリズム その3 (algorithm 3)</h4>
      <p>アルゴリズムその3です。</p>
    </div>
  );
}
