import React, { FC } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { BtnText } from "../UI/button/btn-text/BtnText"
import { MyTextarea } from "../UI/input/areatext/MyTextarea"
import { InputDate } from '../UI/input/input-date/InputDate'
import { InputTimeHMS } from "../UI/input/input-time/InputTimeHMS"
import style from './CardFormCreate.module.less'
import { ICardFormCreate } from "../../types/types"






interface IPropsCardFormCreate {
    props: ICardFormCreate;
}

export const CardFormCreate: FC<IPropsCardFormCreate> = ({ props }) => {
    const [disable, setDisable] = useState<boolean>(true)
    const {
        itemRoom,
        saveRoomHandler,
        setModalForm,
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
    console.log("FORM itemRoom= ", itemRoom)
    return (
        <div className={style.container}>
            <MyTextarea props={propsAreaTitle} />
            <InputDate props={propsDateBegin} />
            <InputDate props={propsDateFinish} />
            <InputTimeHMS props={propsDuration} />
            <BtnText
                onClick={() => {
                    saveRoomHandler()
                    // setModalForm(false)
                }}
                disabled={disable}
            >
                Сохранить
            </BtnText>
        </div>
    )
}