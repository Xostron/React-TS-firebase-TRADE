import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { HandySvg } from 'handy-svg'
import styleMenu from './LinkIconMenu.module.less'
import styleSt from './LinkIconSt.module.less'




const colorDisabled = '#0000003d'
interface ILinkIconProps {
    name: String,
    icon: React.ReactElement,
    to: String,
    type: String,
    disabled: Boolean
}
// types<ILinkIconProps>
export const LinkIcon: FC<ILinkIconProps> = ({ icon, name, to, type, disabled }) => {


    //инициализация стиля
    let style = styleSt
    switch (type) {
        case 'menu' || 'navbar':
            style = styleMenu
            break

        case 'st' || 'standart':
            style = styleSt
            break

        default:
            style = styleSt
    }

    // подстветка активного состояния для NavLink
    function activeStyle(isActive: Boolean) {
        return (isActive ? (style.myLink + ' ' + style.active) : style.myLink)
    }


    const eventDisabled = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled)
            e.preventDefault()
    }



    return (
        <NavLink
            key={to}
            className={activeStyle}
            to={to}
            onClick={eventDisabled}
            style={disabled ? { color: colorDisabled } : {}}
        >
            <HandySvg
                src={icon}
                className={style.navIcon}
                width='24px'
                height='24px'
                style={disabled ? { fill: colorDisabled } : {}}
            />
            <span className={style.navText}>{name}</span>
        </NavLink>
    )
}