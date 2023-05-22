import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export interface INavItemProps {
    isDisabled?: boolean
    to: string
    children: ReactNode
}

const NavItem = (props: INavItemProps) => {
    const location = useLocation()
    const isActive = () => location.pathname === props.to

    const linkClicked = (e: any) => {
        if (props.isDisabled || isActive()) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
    }

    const activeClassName = isActive() ? 'active' : ''

    return (
        <li className={`nav-item`}>
            <Link
                to={props.to}
                className={`nav-link ${activeClassName} ${props.isDisabled ? 'disabled' : ''}`}
                onClick={linkClicked}
                aria-current={isActive() ? 'page' : 'false'}
            >
                {props.children}
            </Link>
        </li>
    )
}

export default NavItem
