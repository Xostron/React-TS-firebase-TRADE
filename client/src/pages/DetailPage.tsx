import React, { FC, useContext, useState, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { firebaseContext } from "..";
import { Loader } from "../components/UI/loader/Loader";
import { IRoom } from "../types/types";
import style from './DetailTradePage.module.less'
export interface IDetailPage {
    room: IRoom;
    uid: string | null;
    isOpen: boolean;
}

interface IDetailPageProps {
    props: IDetailPage;
}

export const DetailPage: FC<IDetailPageProps> = ({ props }) => {
    const {
        room,
        uid,
        isOpen,
    } = props
    // ********************************Firebase********************************
    const { db } = useContext(firebaseContext)

    // ********************************Database********************************
    // *********************************State**********************************
    // *******************************Rendering********************************
    let begin = room && new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = room && new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })

    return (
        <div>
            {true && room ?
                <div className={style.container}>
                    <div className={style.info}>
                        <span>{room.title}</span>
                        <span>Начало торгов {begin}</span>
                        <span>Окончание торгов {finish}</span>
                        <span>Длительность хода {room.durationRound}</span>
                        {/* <span>Пройдено ходов {timer.countRound}</span> */}
                        {/* {timer.message !== '' ? <span>{timer.message}</span> : null} */}
                    </div>
                    <div className={style.hms}>
                        <span>Ход торгов: </span>
                        <span>
                            {/* {timer.hh > 9 ? timer.hh : '0' + timer.hh}: */}
                            {/* {timer.mm > 9 ? timer.mm : '0' + timer.mm}: */}
                            {/* {timer.ss > 9 ? timer.ss : '0' + timer.ss} */}
                        </span>
                    </div>

                    <div className={style.players}>
                        {/* <PlayersTable props={propsPlayerTable} /> */}
                    </div>

                </div>
                :
                <div className={style.container2}>
                    {/* <span>...Загружается</span> */}
                    <Loader />
                </div>
            }
        </div>
    )
}