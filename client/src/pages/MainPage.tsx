import React, {
    FC, useContext, useState, useEffect,
    useReducer, useCallback, useMemo, useLayoutEffect
} from "react";

import { firebaseContext } from "..";
import { Title } from "../components/title/Title";
import { BtnIcon } from "../components/UI/button/btn-icon/BtnIcon";
import iAdd from '../source/icons/bx-customize.svg'
import { CardRoom } from "../components/card-room/CardRoom"
import { ListSquare } from "../components/UI/list/list-square/ListSquare";
import { IRoom, IRoomComponent } from "../types/types";
import { MyModal } from "../components/UI/modal/MyModal";
import { DetailPage, IDetailPage } from "./DetailPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRooms } from "../api/api-firebase-room";

const mockRoom: Array<IRoom> = [
    {
        id: '',
        title: '1',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
    {
        id: '',
        title: '2',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
    {
        id: '',
        title: '3',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
    {
        id: '',
        title: '4',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
    {
        id: '',
        title: '5',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
    {
        id: '',
        title: '6',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
    {
        id: '',
        title: '7',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
]

const defaultPropsDetailPage = {
    room: {
        id: '',
        title: '1',
        dateBegin: '',
        dateFinish: '',
        durationRound: '',
        createAT: ''
    },
    uid: '',
    isOpen: false
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
    const [propsDetailPage, setPropsDetailPage] = useState<IDetailPage>(defaultPropsDetailPage)

    // ***************************List square props****************************
    // callback формирования данных в roomComponents для ListSquare
    const cbPropsRoom = (room: IRoom, idx: number) => ({
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer
    })

    // const propsRoom = useMemo(() => cbPropsRoom, [rooms])

    // handler props
    const handlerEnterAsWatch = (idx: number) => {

        setPropsDetailPage(cbPropsDetailRoom(idx, true))
        setModalRoom(true)
    }
    const handlerEnterAsPlayer = (idx: number) => {

        setPropsDetailPage(cbPropsDetailRoom(idx, true))
        setModalRoom(true)
    }

    // ***************************DetailPage props****************************
    // callback формирование props для просмотра комнаты в DetailTradePage 
    const cbPropsDetailRoom = (idx: number, open: boolean) => ({
        room: rooms[idx],
        uid: user ? user.uid : null,
        isOpen: open,
    })
    // ***************************FormCreate props****************************
    console.log('Render page', rooms)
    return (
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
                    items={rooms.map(cbPropsRoom)}
                    renderItem={(room, idx) => {
                        return (
                            <CardRoom key={idx} props={room} />
                        )
                    }}
                />
            }

            <MyModal visible={modalForm} setVisible={setModalForm} index={1}>

            </MyModal>

            <MyModal visible={modalRoom} setVisible={setModalRoom} index={2}>
                {propsDetailPage.isOpen &&
                    <DetailPage props={propsDetailPage} />}
            </MyModal>

        </>
    )
}