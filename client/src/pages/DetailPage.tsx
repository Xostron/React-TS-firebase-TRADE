import React, { FC, useContext, useState, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { firebaseContext } from "..";
import { Loader } from "../components/UI/loader/Loader";
import { IPlayer, IPlayersTable, IRoom } from "../types/types";
import style from './DetailTradePage.module.less'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, where, query } from "firebase/firestore";
import { PlayersTable } from "../components/player-table/PlayersTable";

export interface IDetailPage {
    room?: IRoom;
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

    // *********************************State**********************************
    const [players, setPlayers] = useState<IPlayer[]>([])

    // *******************************Rendering********************************
    let begin = room && new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = room && new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let idRoom = room ? room.id : '0'

    let propsPlayerTable: IPlayersTable = {
        players: players,
        uid: uid,
        idRoom: idRoom,
        isOpen: isOpen
    }
    // ********************************Firebase********************************
    const { db } = useContext(firebaseContext)
    // автоматически обновляет данные players 
    const [_players, loading] = useCollectionData(
        query(collection(db, 'players'),
            where('idRoom', '==', idRoom))
    )
    // приведение к типу IPlayer[] так как данные от firebase имею свой тип DocumentData
    useLayoutEffect(() => {
        let data: IPlayer[] = []
        _players?.map((val, idx) => {
            const { idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT } = val
            data.push({ idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT })
        })
        setPlayers(data)
    }, [_players])

    // ********************************Database********************************
    console.log('DetailPage Plyers = ', _players, players)
    // *******************************Rendering********************************


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
                        <PlayersTable props={propsPlayerTable} />
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