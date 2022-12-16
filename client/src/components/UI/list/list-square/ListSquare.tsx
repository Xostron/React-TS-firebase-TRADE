import React, { FC, memo, useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { useResize } from "../../../../hooks/useResize";
import { IRoomComponent } from "../../../../types/types";
import style from './ListSquare.module.less'

interface IListSquare {
    items: IRoomComponent[];
    renderItem: (item: IRoomComponent, idx: number) => React.ReactNode;
}


function RowListSquare({ items, renderItem, }: IListSquare) {
    // массив компонентов
    const arrComponents = items.map(renderItem)

    // слушатель width контента 
    const [size, setSize] = useState<number>(4)
    const refWidth = useRef<HTMLDivElement>(null)
    useResize(resize, initResize)
    function resize() {
        let width = refWidth.current?.clientWidth || 1000
        if (width <= size * 258) {
            if (size > 1)
                setSize(size => size - 1)
        }
        else if (width > (size + 1) * 258) {
            if (size < 7)
                setSize(size => size + 1)
        }
    }
    function initResize(_size: number) {
        let width = refWidth.current?.clientWidth || 1000
        for (let i = 2; i < 8; i++) {
            if (width < i * 258 && width > (i - 1) * 258) {
                setSize(i - 1)
                break
            }
        }
    }

    // преобразование 1мерного в 2мерный массив
    function get2Arr(array: React.ReactNode[], limit: number) {
        const result = [];
        for (var i = 0; i < array.length; i += limit) {
            result.push(array.slice(i, i + limit));
        }
        // console.log('get2Arr = ', result.length)
        return result;
    }

    const newItems = get2Arr(arrComponents, size)

    console.log('Render ListSquare', size)

    return (
        <div className={style.wrapper} ref={refWidth}>
            <div className={style.container}>
                {newItems.map((component, idx) => {
                    return (
                        <div key={idx} className={style.row}>
                            {component.map(val => { return (val) })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const ListSquare = memo(RowListSquare,
    (prevProps, nextProps) =>
        // prevProps.items.forEach((val,idx)=>val===nextProps.items[idx])
        prevProps.items.length === nextProps.items.length
)
