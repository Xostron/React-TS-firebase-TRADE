import React, { FC, useContext, useState, useEffect, useLayoutEffect, useCallback, useMemo, memo } from "react";
import { Loader } from "../components/UI/loader/Loader";
import { IDetailPage, IPlayer, IPlayersTable, ITimerDetailPage } from "../types/types";
import style from './DetailTradePage.module.less'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, where, query } from "firebase/firestore";
import { PlayersTable } from "../components/player-table/PlayersTable";
import { firebaseContext, RoomContext } from "../context/MyContext";




interface IDetailPageProps {
    props: IDetailPage;
    timer: ITimerDetailPage;
}

const emptyPlayers: IPlayer = {
    idRoom: '',
    uid: '',
    userName: '',
    row1: '',
    row2: 0,
    row3: 0,
    row4: 0,
    row5_1: 0,
    row5_2: 0,
    row5_3: 0,
    online: false,
    createAT: '',
    mySync: false
}

const RowDetailPage: FC<IDetailPageProps> = ({ props, timer }) => {

    const {
        room,
        uid,
        isGuest,
    } = props

    let idRoom = room ? room.id : '0'
    // ********************************Context********************************
    const { db } = useContext(firebaseContext)
    const { updYou, setUpdYou, you, setYou, modalRoom, setModalRoom } = useContext(RoomContext)
    // *********************************State**********************************
    const [players, setPlayers] = useState<IPlayer[]>([])

    // автоматически обновляет данные players
    const [_players, loading] = useCollectionData(
        query(collection(db, 'players'),
            where('idRoom', '==', idRoom))
    )

    // приведение к типу IPlayer[] так как данные от firebase имею свой тип DocumentData
    useEffect(() => {
        let data: IPlayer[] = []
        // получаем учасников комнаты не больше 5
        _players?.map((val, idx) => {
            const { idRoom, uid, userName, row1, row2, row3,
                row4, row5_1, row5_2, row5_3, online, createAT } = val
            data.push({
                idRoom, uid, userName, row1, row2, row3,
                row4, row5_1, row5_2, row5_3, online, createAT
            })
        })
        // добавляем пустые места, до 5 участников + разделяем на 2 состояния:
        // участник и другие игроки, либо если заходим в комнату как гость - только участники
        let arrPlayers: IPlayer[] = []
        for (let i = 0; i < 5; i++) {
            if (i <= data.length - 1) {
                // если гость, то формируем участников
                if (isGuest) {
                    arrPlayers.push(data[i])

                }
                // если это не я - добавляем к другим участникам
                else if (data[i].uid !== uid) {
                    arrPlayers.push(data[i])
                }
                // добавляем себя, если не синхронизирован
                else if (data[i].uid === uid && !updYou) {
                    setYou(data[i])
                    setUpdYou(true)
                }
            }
            // добавляем пустые места, если участники закончились 
            else { arrPlayers.push(emptyPlayers) }
        }
        setPlayers(arrPlayers)
    }, [_players, modalRoom])


    // *******************************HANDLER*******************************
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYou({ ...you, [e.target.name]: e.target.value })
    }

    // *******************************Rendering********************************
    let begin = room && new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = room && new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })

    let propsPlayerTable = {
        players: players,
        you: you,
        changeHandler: changeHandler,
        uid: uid,
        idRoom: idRoom,
        isGuest: isGuest
    }

    // *******************************DEBUG********************************
    // console.log('Render Detail')

    return (
        <div>
            {room ?
                <div className={style.container}>
                    <div className={style.info}>
                        <span>{room.title}</span>
                        <span>Начало торгов {begin}</span>
                        <span>Окончание торгов {finish}</span>
                        <span>Длительность хода {room.durationRound}</span>
                        {timer.countRound && <span>Пройдено ходов {timer.countRound}</span>}
                        {timer.message !== '' ? <span>{timer.message}</span> : null}
                    </div>
                    <div className={style.hms}>
                        <span>Ход торгов: </span>
                        <span>
                            {timer.hh > 9 ? timer.hh : '0' + timer.hh}:
                            {timer.mm > 9 ? timer.mm : '0' + timer.mm}:
                            {timer.ss > 9 ? timer.ss : '0' + timer.ss}
                        </span>
                    </div>

                    <div className={style.players}>
                        {you && players &&
                            <PlayersTable props={propsPlayerTable} />
                        }
                    </div>

                </div>
                :
                <div className={style.container2}>
                    <Loader />
                </div>
            }
        </div>
    )
}
export const DetailPage = memo(RowDetailPage,
    (prevProps, nextProps) => prevProps === nextProps
)










