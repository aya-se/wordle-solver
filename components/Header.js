import Link from 'next/link';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <h3 className="me-3 my-1">
          <Link className="navbar-brand" href="/">
            Wordle Solver
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
            <li className="nav-item mx-3">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" href="/feature">
                Feature
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" href="/info">
                Info
              </Link>
            </li>
            <li className="nav-item mx-3">
              <a
                className=""
                href="https://www.nytimes.com/games/wordle/index.html"
              >
                Wordle<em className="bi bi-box-arrow-up-right"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
