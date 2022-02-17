import styles from '../styles/WordList.module.scss';

export default function WordList(props) {
  return (
    <section className="my-3">
      <h2 className={styles.section_title}>Next Word ... ?</h2>
      <div className={styles.word_list}>
        {props.words.slice(0, 100).map((key, index) => (
          <div key={index} className={styles.word_item + " link-underline"}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
