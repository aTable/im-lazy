import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router-dom'

export interface INavItemProps extends RouteComponentProps {
    isDisabled?: boolean
    to: string
}

const NavItem: FC<INavItemProps> = props => {
    const isActive = () => props.location.pathname === props.to

    const linkClicked = (e: any) => {
        if (props.isDisabled || isActive()) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
    }

    const activeClassName = isActive() ? 'active' : ''

    return (
        <li className={`nav-item ${activeClassName}`}>
            <Link to={props.to} className={`nav-link ${props.isDisabled ? 'disabled' : ''}`} onClick={linkClicked}>
                {props.children} {isActive() ? <span className="sr-only">(current)</span> : null}
            </Link>
        </li>
    )
}

export default withRouter(NavItem)
