import React, { FC } from "react";
import style from './ListColumn.module.less'

interface IListColumn<T> {
    items: T[];
    renderItem: (item: T, idx: number) => React.ReactNode;
}

export function ListColumn<T>({ items, renderItem, }: IListColumn<T>) {
    const arrComponents = items.map(renderItem)


    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {arrComponents.map((component, idx) => {
                    return (component)
                })}
            </div>
        </div>
    )
}