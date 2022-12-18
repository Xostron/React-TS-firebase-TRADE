import React, {
    FC, useContext, useState, useEffect,
    useReducer, useCallback, useMemo, useLayoutEffect, createContext
} from "react";


import { Title } from "../components/title/Title";
import { BtnIcon } from "../components/UI/button/btn-icon/BtnIcon";
import iAdd from '../source/icons/bx-customize.svg'
import { CardRoom } from "../components/card-room/CardRoom"
import { ListSquare } from "../components/UI/list/list-square/ListSquare";
import { ICardFormCreate, IDetailPage, IPlayer, IRoom, IRoomComponent } from "../types/types";
import { MyModal } from "../components/UI/modal/MyModal";
import { DetailPage } from "./DetailPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRooms, saveRoom } from "../api/api-firebase-room";
import { firebaseContext, RoomContext } from "../context/MyContext";
import { getPlayers, isMyRoom, savePlayer } from "../api/api-firebase-players";
import { CardFormCreate } from "../components/card-form-create/CardFormCreate";




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
    durationRound: '00:02:12',
    createAT: ''
}
export const MainPage: FC = () => {

    // ********************************Firebase********************************
    const { auth, db } = useContext(firebaseContext)
    const [user] = useAuthState(auth)

    // ********************************Database********************************
    const [rooms, setRooms] = useState<IRoom[]>([])
    useEffect(() => { getRooms(db, 'rooms', setRooms) }, [])

    // *********************************State**********************************
    const [modalForm, setModalForm] = useState<boolean>(false)
    const [modalRoom, setModalRoom] = useState<boolean>(false)
    const [updYou, setUpdYou] = useState<boolean>(false)
    const [you, setYou] = useState<IPlayer>({} as IPlayer)
    const [propsDetailPage, setPropsDetailPage] = useState<IDetailPage>({} as IDetailPage)
    const [itemRoom, setItemRoom] = useState<IRoom>(defaultRoom)
    // ***************************List square props****************************
    // callback формирования данных в roomComponents для ListSquare
    const cbPropsRooms = (room: IRoom, idx: number) => ({
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer
    })

    // handler props
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
    const saveRoomHandler = async () => {
        saveRoom(db, 'rooms', itemRoom)
        getRooms(db, 'rooms', setRooms)
        setModalForm(false)
    }

    // ***************************DetailPage props****************************
    // callback формирование props для просмотра комнаты в DetailTradePage 
    const cbPropsDetailRoom = (idx: number, guest: boolean) => ({
        room: rooms[idx],
        uid: user ? user.uid : null,
        isGuest: guest,
    })
    // очистка данных при выходе из комнаты
    useEffect(() => {
        if (!modalRoom) {
            setUpdYou(false)
            setYou(emptyPlayers)
            setPropsDetailPage({} as IDetailPage)
        }
    }, [modalRoom])

    // props для формы создания комнаты
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

    // ********************************DEBUG**********************************
    console.log('Render page')
    return (
        <RoomContext.Provider value={{
            updYou, setUpdYou, you, setYou, modalRoom, setModalRoom
        }}>
            <>
                <Title title={'Текущие торги'} >
                    <BtnIcon
                        icon={iAdd}
                        handler={() => { setModalForm(modalForm => !modalForm) }}
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
                        <DetailPage props={propsDetailPage} /> : null}
                </MyModal>

            </>
        </RoomContext.Provider>
    )
}