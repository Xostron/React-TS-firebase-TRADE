import React, { FC } from "react";
import style from './InputNumber.module.less'
import { HandySvg } from "handy-svg";

interface IInputNumber {
    name: string,
    placeholder?: string,
    value: number,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

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

            {/* {value ?
                <span className={style.name}>{placeholder}:</span>
                :
                <span className={style.name}>{placeholder}...</span>
            } */}

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