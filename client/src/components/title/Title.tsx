import React, { FC } from 'react'
import { HandySvg } from 'handy-svg'
import style from './Title.module.less'



interface ITitle {
    children?: React.ReactNode,
    icon?: string,
    handler?: () => void,
    title?: String,
    text?: String
}

export const Title: FC<ITitle> = ({ children, icon, handler, title, text }) => {


    return (
        <div className={style.title}>
            <div className={style.left}>
                {
                    icon ? <div className={style.btn} onClick={handler}>
                        <HandySvg
                            src={icon}
                            className={style.icon}
                        />
                    </div> :
                        null
                }
                <strong>{title}</strong>
                <span className={style.text_span}>{text}</span>
            </div>

            <div className={style.right}>
                {children}
            </div>
        </div>
    )
}