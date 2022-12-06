import React, { FC } from "react"
import { IRoom } from "../../types/types"
import style from './CardTrade.module.less'



interface CardTrade {
    room: IRoom;
}


export const CardTrade: FC<CardTrade> = ({ room }) => {
    return (
        <div className={style.container}>

        </div>
    )
}