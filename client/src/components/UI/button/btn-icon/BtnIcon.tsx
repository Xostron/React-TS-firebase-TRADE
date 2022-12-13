import React, { FC, memo } from "react";
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
    return (
        <div className={style.container} onClick={handler}>
            {children}
            {tooltip && <div className={style.tooltip}>{tooltip}</div>}
            <HandySvg className={style.icon} src={icon} width={width} height={height} />
        </div>
    )
}

// children , handler - убираем из условия рендеринга (предикат), 
// т.к они являются сложными данными 
// и при каждом их определении для React они изменяются 
// (становятся новыми - новый адрес в ОЗУ)
// поэтому оставляем простые пропсы
// чтобы сравнивать сложные данные их необходимо кэшировать при помощи 
// useCallback (функции - ссылка в памяти)
// и(или) useMemo (кэширует результаты, данные)



export const BtnIcon = memo<IBtnIcon>(RowBtnIcon,
    (prevProps, nextProps) =>
        // prevProps.children === nextProps.children &&
        // prevProps.handler === nextProps.handler &&
        prevProps.height === nextProps.height &&
        prevProps.width === nextProps.width &&
        prevProps.icon === nextProps.icon &&
        prevProps.tooltip === nextProps.tooltip
) 