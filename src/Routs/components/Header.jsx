import { Link } from "react-router-dom"

function Header() {

  return(
   <section className="header-section">

    <div>
      <Link to="upload">
        Upload
      </Link>


      <Link to="browse">
        Browse
      </Link>

    </div>

    <Link className="snap" to="">
      SNAP
    </Link>

   </section>
  )
}

export default Header