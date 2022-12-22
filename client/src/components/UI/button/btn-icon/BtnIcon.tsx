import React, { FC, memo, useCallback, useEffect } from "react";
import style from './BtnIcon.module.less'
import { HandySvg } from 'handy-svg'

interface IBtnIcon {
    icon?: string,
    handler?: (e: React.MouseEvent<HTMLDivElement>) => void,
    width?: number,
    height?: number,
    children?: React.ReactNode,
    tooltip?: string
}

const RowBtnIcon: FC<IBtnIcon> = ({ tooltip, icon = '', handler,
    width = 24, height = 24, children }) => {

    console.log('Render BtnIcon')

    return (
        <div className={style.container} onClick={handler}>
            {children}
            {tooltip && <div className={style.tooltip}>{tooltip}</div>}
            <HandySvg className={style.icon} src={icon} width={width} height={height} />
        </div>
    )
}


// Про глубокую проверка:
// memo выполняет поверхностную проверку props, т.е. он видит отличия в простых данных (числа, строки, boolean)
// сложные данные (функции, массивы, объекты) - при сравнении в memo всегда false (потому что при рендеринге, ссылка на эти объекты новая)
// для того чтобы сравнивать сложные данные используют useMemo (для хеширования объектов, результатов функций) и useCallback (хэширует ссылку на функцию)
// prevProps === nextProps - true - rerender не выполняется
// prevProps === nextProps - false - rerender выполняется

// данный комопнент кнопка имеет простые (height,width,icon,tooltip,children - это строки и числа) и 
// сложные данные (handler - функция при каждом рендеринге новая, поэтому она захеширована в 
//     родительском компоненте useCallback с зависимостью от статуса авторизации) - таким образов наша кнопка 
// стала чистым компонентом и мы можем убрать правила рендеринга prevProps/nextProps

export const BtnIcon = memo<IBtnIcon>(RowBtnIcon,
    // предикат - функция, возвращающая true||false (false - перерендерить, true - нет)
    (prevProps, nextProps) =>
        prevProps.children === nextProps.children &&
        prevProps.handler === nextProps.handler &&
        prevProps.height === nextProps.height &&
        prevProps.width === nextProps.width &&
        prevProps.icon === nextProps.icon &&
        prevProps.tooltip === nextProps.tooltip
) 