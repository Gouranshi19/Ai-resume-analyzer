import { NavLink } from 'react-router-dom'
import { primaryNavigation } from '../../data/navigationData'
import './Navbar.css'

function Navbar() {
  return <header className="navbar"><NavLink className="navbar__brand" to="/"><span aria-hidden="true" />CV-INSIGHT-AI</NavLink><nav aria-label="Primary navigation" className="navbar__links">{primaryNavigation.map(({ label, to }) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav><div className="navbar__actions"><NavLink to="/login">Login</NavLink><NavLink className="navbar__register" to="/signup">Register</NavLink></div></header>
}

export default Navbar