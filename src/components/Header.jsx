const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-main">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          FitFlow <span>Planner</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Main page
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/new">
                Add Plan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/update">
                Update Plan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
