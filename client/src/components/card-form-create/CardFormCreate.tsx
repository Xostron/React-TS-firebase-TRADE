import React, { FC } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { BtnText } from "../UI/button/btn-text/BtnText"
import { MyTextarea } from "../UI/input/areatext/MyTextarea"
import { InputDate } from '../UI/input/input-date/InputDate'
import { InputTimeHMS } from "../UI/input/input-time/InputTimeHMS"
import style from './CardFormCreate.module.less'
import { IAreatext, IInputDate, IInputHMS, IRoom } from "../../types/types"




interface ICardFormCreate {
    itemRoom: IRoom,
    saveRoomHandler: () => void,
    setModalCreate: (state: boolean) => void,
    propsAreaTitle: IAreatext,
    propsDateBegin: IInputDate,
    propsDateFinish: IInputDate,
    propsDuration: IInputHMS
}

interface IPropsCardFormCreate {
    props: ICardFormCreate;
}

export const CardFormCreate: FC<IPropsCardFormCreate> = ({ props }) => {
    const [disable, setDisable] = useState(true)
    const {
        itemRoom,
        saveRoomHandler,
        setModalCreate,
        propsAreaTitle,
        propsDateBegin,
        propsDateFinish,
        propsDuration
    } = props

    const disableBtn = () => {
        if (itemRoom.title != '' && itemRoom.dateBegin != '' &&
            itemRoom.dateFinish != '' && itemRoom.durationRound != '') {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }

    useEffect(() => {
        disableBtn()
    }, [itemRoom])

    return (
        <div className={style.container}>
            <MyTextarea props={propsAreaTitle} />
            <InputDate props={propsDateBegin} />
            <InputDate props={propsDateFinish} />
            <InputTimeHMS props={propsDuration} />
            <BtnText
                onClick={() => {
                    saveRoomHandler()
                    setModalCreate(false)
                }}
                disabled={disable}
            >
                Сохранить
            </BtnText>
        </div>
    )
}