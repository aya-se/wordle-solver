import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid px-0">
        <h3 className="my-1">
          <Link className="navbar-brand" href="/">
            <a className="link-underline px-2">
              Wordle Solver Blob
            </a>
          </Link>
        </h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link link-underline">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/feature">
                <a className="nav-link link-underline">Feature</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/info">
                <a className="nav-link link-underline">Info</a>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link link-underline"
                target="_blank"
                href="https://www.nytimes.com/games/wordle/index.html"
                rel="noreferrer"
              >
                  Wordle
                  <em className="bi bi-box-arrow-up-right mx-1" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
