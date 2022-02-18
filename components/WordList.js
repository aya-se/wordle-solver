import styles from '../styles/WordList.module.scss';

export default function WordList(props) {
  // WordListの単語クリックで自動的に入力
  const onClickWord = async (event, word) => {
    event.preventDefault();
    if (props.letterIdx % 5 === 0)
      props.onClickKeyboard(word);
  } 
  return (
    <section className="my-3">
      <h2 className={styles.section_title}>Next Word ... ?</h2>
      <div className={styles.word_list}>
        {props.words.slice(0, 100).map((key, index) => (
          <a
            key={index}
            href="/hoge"
            className={styles.word_item + ' link-underline'}
            onClick={(event) => onClickWord(event, key.toUpperCase())}
          >
            <p className={styles.rank}>
              <span className={styles.rank_number}>{index + 1}</span>
              {index % 10 === 0 && 'st'}
              {index % 10 === 1 && 'nd'}
              {index % 10 === 2 && 'rd'}
              {index % 10 >= 3 && 'th'}
            </p>
            <p className={styles.word} key={key}>
              {key.toUpperCase()}
            </p>
          </a>
        ))}
      </div>
      {props.words.length === 0 && (
        <p className="text-center">表示可能な英単語がありません……。</p>
      )}
    </section>
  );
}
