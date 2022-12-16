import React, { useState, useEffect, useLayoutEffect, useRef, FC, MutableRefObject } from "react";
import style from './MyTextarea.module.less'
import { HandySvg } from 'handy-svg'
import { IAreatext } from "../../../../types/types";




interface IPropsArea {
    props: IAreatext
}

export const MyTextarea: FC<IPropsArea> = ({ props }) => {
    const styleArea = [style.myTextarea]
    const {
        name,
        placeholder,
        changeHandler,
        value,
        autofocus,
    } = props

    // autosize - авторастягивание при заполнении/обратно
    const ref = useRef() as MutableRefObject<HTMLTextAreaElement>


    const autosize = () => {
        let str = ref.current.style.height.match(/[0-9]/g) || []
        let val = Number(str.join(''))

        if (ref.current.value === '') {
            ref.current.style.height = '39px'
        }
        else if (ref.current.scrollHeight > val) {
            ref.current.style.height = `${ref.current.scrollHeight}px`
        }
        else if (ref.current.scrollHeight < val) {
            ref.current.style.height = `${ref.current.scrollHeight - 20}px`;
        }
        // console.log('testarea= ', ref.current.scrollHeight, ref.current.style.height)
    }

    // onChange - событие для обработки текста
    const handler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeHandler(e)
        autosize()
    }


    // init начальную высоту areatext
    useEffect(() => {
        autosize()
        if (ref.current.scrollHeight === 59) { ref.current.style.height = '39px' }

    }, [])

    // 
    return (
        <div className={style.container}>


            <textarea
                className={styleArea.join(' ')}
                autoComplete='off'
                autoFocus={autofocus || false}
                placeholder={placeholder}
                name={name}
                onChange={handler}
                value={value}
                ref={ref}
            />
        </div>
    )
}