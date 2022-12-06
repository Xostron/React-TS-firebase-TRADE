import React from "react";
import style from './ListCol.module.less'

export const ListCol = ({ item, renderItem }) => {
    return (
        <div className={style.container}>
            {item.map(renderItem)}
        </div>
    )
}