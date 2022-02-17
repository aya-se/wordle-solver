import styles from '../styles/WordList.module.scss';

export default function WordList(props) {
  return (
    <section className="my-3">
      <h2 className={styles.section_title}>Next Words ... ?</h2>
      <div className={styles.word_list}>
        {props.words.slice(0, 100).map((key, index) => (
          <a
            key={index}
            href="/hoge"
            className={styles.word_item + ' link-underline'}
            onClick={(event) => event.preventDefault()}
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
        {props.words.length === 0 && 
          <p className="text-center">
            表示可能な英単語がありません……。
          </p>
        }
      </div>
    </section>
  );
}
