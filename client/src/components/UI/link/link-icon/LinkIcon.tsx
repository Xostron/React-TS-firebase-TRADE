import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { HandySvg } from 'handy-svg'
import styleMenu from './LinkIconMenu.module.less'
import styleSt from './LinkIconSt.module.less'
import { ILink } from '../../../../types/types'



const colorDisabled = '#0000003d'

interface ILinkIconProps {
    item: ILink
}
// types<ILinkIconProps>
export const LinkIcon: FC<ILinkIconProps> = ({ item }) => {


    //инициализация стиля
    let style = styleSt
    switch (item.type) {
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
    const activeStyle = ({ isActive }: { isActive: boolean }): string => {
        return (isActive ? (style.myLink + ' ' + style.active) : style.myLink)
    }


    const eventDisabled = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.disabled)
            e.preventDefault()
    }

    const iconDisabled = (item.disabled ? { fill: colorDisabled } : {}) as string || undefined

    return (
        <NavLink
            key={item.to}
            className={activeStyle}
            to={item.to}
            onClick={eventDisabled}
            style={item.disabled ? { color: colorDisabled } : {}}
        >
            <HandySvg
                src={item.icon}
                className={style.navIcon}
                width='24px'
                height='24px'
                style={iconDisabled}
            />
            <span className={style.navText}>{item.name}</span>
        </NavLink>
    )
}