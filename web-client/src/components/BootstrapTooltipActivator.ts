import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Tooltip } from 'bootstrap'

export default function BootstrapTooltipActivator() {
    const { pathname } = useLocation()

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        for (let el of tooltipTriggerList) {
            new Tooltip(el)
        }
    }, [pathname])

    return null
}
