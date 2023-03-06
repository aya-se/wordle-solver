import styles from '../styles/Footer.module.scss'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="d-flex justify-content-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by @aya_se
        </a>
        <ul className={styles.sns_links + ' mx-3'}>
          <li>
            <a
              href="https://twitter.com/ayase_lab"
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
          <li>
            <a
              href="https://github.com/aya-se"
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/kakeru-hattori-973404240/"
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
