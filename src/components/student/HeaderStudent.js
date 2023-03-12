const styless = {
  "position":"absolute",
  "top":"6px",
  "left": "10px"
}
export const HeaderStudent = () => {
  return(
      <>
        <nav className="navbar navbar-light navbar-expand-md fixed-top navbar-shrink py-3" id="mainNav">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/"><span
              style={styless}>E-School</span></a>
            <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
              <span className="visually-hidden">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><a className="nav-link active" href="/project">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/publication">publication</a></li>
                <li className="nav-item"><a className="nav-link" href="/pomodoro">pomodoro</a></li>
                <li className="nav-item"><a className="nav-link" href="/project">mes projets</a></li>
                <li className="nav-item"><a className="nav-link" href="/login">login</a></li>
                <li className="nav-item"><a className="nav-link" href="/log out">log out</a></li>
                <li className="nav-item"><a className="nav-link" href="/register">register</a></li>
              </ul>
              {/*<a className="btn btn-primary shadow" role="button" href="signup.html">Sign up</a>*/}
            </div>
          </div>
        </nav>
      </>
  );
}
