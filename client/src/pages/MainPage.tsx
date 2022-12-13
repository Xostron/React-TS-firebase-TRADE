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
import { ListColumn } from "../components/UI/list/list-column/ListColumn";

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


export const MainPage: FC = () => {

    // ******************************Athorization******************************
    const { auth } = useContext(firebaseContext)

    // ******************************Database******************************
    const [rooms, setRooms] = useState<IRoom[]>(mockRoom)

    // ******************************List square props******************************
    const [roomComponents, setRoomComponents] = useState<IRoomComponent[]>([])
    const handlerEnterAsWatch = (idx: number) => { }
    const handlerEnterAsPlayer = (idx: number) => { }
    // callback превращение данных в roomComponents для ListSquare
    const cbPropsRoom = useCallback((room: IRoom, idx: number) => ({
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer
    }), [])
    // формирование пропса roomComponents после рендеринга, перед фактическим появлением в DOM
    useEffect(() => {
        rooms && setRoomComponents(rooms.map(cbPropsRoom))
    }, [rooms])

    console.log('Render page')
    return (

        <>
            <Title title={'Текущие торги'} >
                <BtnIcon
                    icon={iAdd}
                    handler={() => { }}
                    tooltip='Добавить карточку'
                />
            </Title>

            <ListSquare
                items={roomComponents}
                renderItem={(room, idx) => {
                    return (
                        <CardRoom key={idx} props={room} />
                    )
                }}
            />






        </>
    )
}