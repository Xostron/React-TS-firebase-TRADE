import React, { FC } from "react";
import style from './InputNumber.module.less'
import { IInputNumber } from "../../../../types/types";



interface IInputNumberProps {
    props: IInputNumber;
}

export const InputNumber: FC<IInputNumberProps> = ({ props }) => {

    const {
        name,
        placeholder,
        value,
        changeHandler,
    } = props

    return (
        <div className={style.container}>

            <input
                className={style.numb}
                name={name}
                value={value}
                type="number"
                onChange={(e) => changeHandler(e)}
            />
        </div>
    )
}