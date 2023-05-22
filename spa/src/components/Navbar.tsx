import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import AuthContext from '../stores/AuthContext'

export interface INavBarProps {}
const NavBar = (props: INavBarProps) => {
    const { state, dispatch } = useContext(AuthContext)
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link
                    className="navbar-brand"
                    to="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Go home"
                    data-bs-original-title="Go home"
                >
                    im-lazy
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavItem to="/">Home</NavItem>
                        <NavItem to="/weather">Weather</NavItem>
                        <NavItem to="/todos">Todos</NavItem>
                        <NavItem to="/speakers">Speakers</NavItem>
                        <NavItem to="/health">Health</NavItem>
                        <NavItem to="/error-demo">Error Demo</NavItem>
                    </ul>
                    {state.user && (
                        <button onClick={logout} className="btn btn-secondary">
                            Logout <i className="bi bi-x-lg" />
                        </button>
                    )}
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
