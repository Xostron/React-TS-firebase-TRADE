import React, { FC } from 'react'
import style from './Loader.module.less'

export const Loader: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.loader}></div>
        </div>

    )
}