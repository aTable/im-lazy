import React, { useContext } from 'react'
import { withRouter, Link } from 'react-router-dom'
import NavItem from './NavItem'
import AuthContext from '../stores/AuthContext'

export interface INavBarProps {}
const NavBar = (props: INavBarProps) => {
    const { state, dispatch } = useContext(AuthContext)
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Boilerplate
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="/protected">Protected</NavItem>
                    <NavItem to="/health">Health</NavItem>
                    <NavItem to="/artists">Artists</NavItem>
                    <NavItem to="/error-demo">Error Demo</NavItem>
                </ul>
                {state.token && (
                    <button onClick={logout} className="btn btn-secondary">
                        Logout <i className="fa fa-times" />
                    </button>
                )}
            </div>
        </nav>
    )
}

export default withRouter(NavBar)
