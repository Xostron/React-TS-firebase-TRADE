import React, { FC, memo } from "react";
import { IRoomComponent } from "../../types/types";
import { BtnText } from "../UI/button/btn-text/BtnText";
import style from './CardRoom.module.less'


interface IRoomCard {
    props: IRoomComponent
}

const RowCardRoom: FC<IRoomCard> = ({ props }) => {

    const {
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer,
    } = props

    let begin = new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })

    // console.log('Render CardRoom =', idx + 1)

    return (
        <div className={style.container}>

            <span>{room.title}</span>
            <span>Начало торгов {begin}</span>
            <span>Окончание торгов {finish}</span>
            {/* <span>{timer}</span> */}

            <BtnText onClick={() => handlerEnterAsPlayer(idx)}>
                Войти как участник
            </BtnText>
            <BtnText onClick={() => handlerEnterAsWatch(idx)}>
                Войти как наблюдатель
            </BtnText>

        </div>
    )
}

export const CardRoom = memo(RowCardRoom,
    (prevProps, nextProps) =>
        // prevProps.props.idx === nextProps.props.idx &&
        // prevProps.props.room === nextProps.props.room
        prevProps.props === nextProps.props
)