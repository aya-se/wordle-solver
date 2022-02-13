import Link from 'next/link';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand mb-0 h1" href="/">
          Wordle Solver
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <a href="https://www.nytimes.com/games/wordle/index.html">
                本日のWordle
              </a>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" href="/feature">
                Feature
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" href="/info">
                Info
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
