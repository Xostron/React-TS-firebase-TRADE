import React, {
    FC, useContext, useState, useEffect,
    useReducer, useCallback, useMemo, useLayoutEffect, createContext
} from "react";
import { Title } from "../components/title/Title";
import { BtnIcon } from "../components/UI/button/btn-icon/BtnIcon";
import iAdd from '../source/icons/bx-customize.svg'
import { CardRoom } from "../components/card-room/CardRoom"
import { ListSquare } from "../components/UI/list/list-square/ListSquare";
import { ICardFormCreate, IDetailPage, IPlayer, IRoom, IRoomComponent, ITimerDetailPage } from "../types/types";
import { MyModal } from "../components/UI/modal/MyModal";
import { DetailPage } from "./DetailPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRooms, saveRoom } from "../api/api-firebase-room";
import { firebaseContext, RoomContext } from "../context/MyContext";
import { getPlayers, isMyRoom, savePlayer } from "../api/api-firebase-players";
import { CardFormCreate } from "../components/card-form-create/CardFormCreate";
import { useSchedular } from "../hooks/useSchedular";


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
const defaultRoom: IRoom = {
    id: '',
    title: '',
    dateBegin: '',
    dateFinish: '',
    durationRound: '00:02:00',
    createAT: ''
}
export const MainPage: FC = () => {

    // *********************************Hooks**********************************
    const { auth, db } = useContext(firebaseContext)
    const [user] = useAuthState(auth)
    const { currentTime } = useSchedular(() => callbackSchedular(), 1000)

    // **************************Data from firestore***************************
    const [rooms, setRooms] = useState<IRoom[]>([])
    useEffect(() => { getRooms(db, 'rooms', setRooms) }, [])

    // *********************************State**********************************
    const [modalForm, setModalForm] = useState<boolean>(false)
    const [modalRoom, setModalRoom] = useState<boolean>(false)
    const [updYou, setUpdYou] = useState<boolean>(false)
    const [you, setYou] = useState<IPlayer>({} as IPlayer)
    const [propsDetailPage, setPropsDetailPage] = useState<IDetailPage>({} as IDetailPage)
    const [itemRoom, setItemRoom] = useState<IRoom>(defaultRoom)
    const [remainingTime, setRemainingTime] = useState<ITimerDetailPage>({} as ITimerDetailPage)

    // *******************************Schedular********************************
    function callbackSchedular() {
        // console.log('TradesPage schedular', remainingTime)
        // setRemainingTime(new Date(currentTime).toISOString())
        if (modalRoom && propsDetailPage.room?.id) {
            // console.log('SHEDULAR = ', Date.parse(currentTime), propsDetailRoom.room)
            let begin = Date.parse(propsDetailPage.room.dateBegin)
            let finish = Date.parse(propsDetailPage.room.dateFinish)
            let current = Date.parse(currentTime)
            let totalTime = finish - begin
            // console.log('begin', begin)
            // console.log('finish', finish)
            // console.log('current', current)
            if (current < finish && current > begin) {
                // торги открыты
                let elapsedTime = current - begin
                // извлекаем длительность раунда 
                let roundBig = Date.parse('2022-12-10T' + propsDetailPage.room.durationRound)
                let roundZero = Date.parse('2022-12-10T00:00:00')
                let round = roundBig - roundZero
                // console.log('SHEDULAR ROUND= ', roundBig, roundZero, round)
                // кол-во прошедших райндов
                // let countRound = Math.trunc(elapsedTime / round) //parseInt
                let countRound = parseInt((elapsedTime / round).toString())
                let moduloRound = elapsedTime % round
                let remaining = round - moduloRound
                // console.log('ROUND = ', countRound)
                // результат время хода раунда
                let hh = parseInt((remaining / 3600000).toString()) //parseInt
                let mm = parseInt(((remaining - hh * 3600000) / 60000).toString()) //parseInt
                let ss = (remaining - hh * 3600000 - mm * 60000) / 1000
                // console.log('SHEDULAR ROUND= ', countRound, remaining, `${hh}:${mm}:${ss}`)
                setRemainingTime({ hh, mm, ss, countRound, message: '' })
            }
            else if (current > finish) {
                // торги закрыты
                setRemainingTime({
                    hh: 0,
                    mm: 0,
                    ss: 0,
                    countRound: 0,
                    message: 'Торги закончились'
                })
            }
            else if (current < begin) {
                // торги еще не начались
                setRemainingTime({
                    hh: 0,
                    mm: 0,
                    ss: 0,
                    countRound: 0,
                    message: 'Торги еще не начались'
                })
            }
        }
        else { }
    }

    // ********************************Handlers********************************
    const handlerEnterAsWatch = (idx: number) => {
        setPropsDetailPage(cbPropsDetailRoom(idx, true))
        setModalRoom(true)
    }
    const handlerEnterAsPlayer = async (idx: number) => {
        if (user) {
            // проверка на участника комнаты
            let isAuthInRoom = await isMyRoom(db, 'players', rooms[idx].id, user.uid)
            let guest = false
            if (isAuthInRoom === true) { }
            else {
                // не являемся участником - проверка на регистрацию (лимит участников)
                let countPlayers = await getPlayers(db, 'players', rooms[idx].id)
                if (countPlayers && countPlayers.length >= 5) {
                    guest = true
                }
                else {
                    savePlayer(db, 'players', rooms[idx].id, user)
                }
            }
            setPropsDetailPage(cbPropsDetailRoom(idx, guest))
            setModalRoom(true)
        }
        else { alert('Войдите через аккаунт goole:)') }
    }
    const changeHandlerForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemRoom({ ...itemRoom, [e.target.name]: e.target.value })
    }
    const changeHandlerArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setItemRoom({ ...itemRoom, [e.target.name]: e.target.value })
    }
    const saveRoomHandler = () => {
        saveRoom(db, 'rooms', itemRoom)
        getRooms(db, 'rooms', setRooms)
        setModalForm(false)
    }
    const handlerCallModalForm = () => {
        user ? setModalForm(modalForm => !modalForm) : alert('Авторизуйтесь через аккаунт google:)')
    }

    // ***************************Form Create props****************************
    let propsFormCreate: ICardFormCreate = {

        itemRoom,
        saveRoomHandler,
        setModalForm,
        propsAreaTitle: {
            name: 'title',
            placeholder: 'Введите название лота...',
            changeHandler: changeHandlerArea,
            value: itemRoom.title,
        },
        propsDateBegin: {
            name: 'dateBegin',
            placeholder: 'Начало торгов',
            changeHandler: changeHandlerForm,
            value: itemRoom.dateBegin
        },
        propsDateFinish: {
            name: 'dateFinish',
            placeholder: 'Окончание торгов',
            changeHandler: changeHandlerForm,
            value: itemRoom.dateFinish
        },
        propsDuration: {
            name: 'durationRound',
            placeholder: 'Длительность хода',
            changeHandler: changeHandlerForm,
            value: itemRoom.durationRound
        }
    }

    // ***************************List square props****************************
    const cbPropsRooms = (room: IRoom, idx: number) => ({
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer
    })

    // ***************************Detail Page props****************************
    const cbPropsDetailRoom = (idx: number, guest: boolean) => ({
        room: rooms[idx],
        uid: user ? user.uid : null,
        isGuest: guest,
    })

    // *******************Effect after exit from DetailPage********************
    useEffect(() => {
        if (!modalRoom) {
            setUpdYou(false)
            setYou(emptyPlayers)
            setPropsDetailPage({} as IDetailPage)
        }
    }, [modalRoom])

    // ********************************DEBUG**********************************
    // console.log('Render page', currentTime)

    return (
        <RoomContext.Provider value={{
            updYou, setUpdYou, you, setYou, modalRoom, setModalRoom
        }}>
            <>
                <Title title={'Текущие торги'} >
                    <BtnIcon
                        icon={iAdd}
                        handler={handlerCallModalForm}
                        tooltip='Добавить карточку'
                    />
                </Title>

                {rooms &&
                    <ListSquare
                        // rooms && rooms.map(cbPropsRoom)
                        items={rooms.map(cbPropsRooms)}
                        renderItem={(room, idx) => {
                            return (
                                <CardRoom key={idx} props={room} />
                            )
                        }}
                    />
                }

                <MyModal visible={modalForm} setVisible={setModalForm} index={1}>
                    {modalForm ? <CardFormCreate props={propsFormCreate} /> : null}
                </MyModal>

                <MyModal visible={modalRoom} setVisible={setModalRoom} index={2}>
                    {modalRoom ?
                        <DetailPage props={propsDetailPage} timer={remainingTime} /> : null}
                </MyModal>

            </>
        </RoomContext.Provider>
    )
}