import React, {
    FC, useContext, useState, useEffect,
    useReducer, useCallback, useMemo
} from "react";
import { CardTrade } from "../components/CardTrade/CardTrade";
import { firebaseContext } from "..";
import { Title } from "../components/title/Title";
import { BtnIcon } from "../components/UI/button/btn-icon/BtnIcon";
import iAdd from '../source/icons/bx-customize.svg'
export const MainPage: FC = () => {
    const { auth } = useContext(firebaseContext)
    const [val, setVal] = useState<boolean>(false)
    const handlerRender = useCallback(() => {
        console.log('btn push')
        setVal(!val)
    }, [])
    return (

        <>
            <Title title={'Комнаты'} >
                <BtnIcon
                    icon={iAdd}
                    handler={handlerRender}
                    tooltip='Добавить карточку'
                />
            </Title>
            <BtnIcon
                icon={iAdd}
                handler={handlerRender}
                tooltip='Добавить карточку'
            />
            {/* <CardTrade /> */}
        </>
    )
}