import React, { FC, useEffect, memo } from 'react'
import { HandySvg } from 'handy-svg'
import style from './Title.module.less'



interface ITitle {
    children?: React.ReactNode,
    icon?: string,
    handler?: () => void,
    title?: String,
    text?: String
}


// children, icon, handler, text

const RowTitle: FC<ITitle> = ({ title, children, icon, handler, text }) => {

    useEffect(() => { console.log('render title') })

    return (
        <div className={style.title}>
            <div className={style.left}>
                {
                    icon ? <div className={style.btn} onClick={handler}>
                        <HandySvg
                            src={icon}
                            className={style.icon}
                        />
                    </div> :
                        null
                }
                <strong>{title}</strong>
                <span className={style.text_span}>{text}</span>
            </div>

            <div className={style.right}>
                {children}
            </div>
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

//  в данном примере children не исключен из правил, т.к. 
// он обернут в memo (является чистым компонентом)

export const Title = memo<ITitle>(RowTitle,
    // предикат - функция, возвращающая true||false 
    (prevProps, nextProps) =>
        prevProps.children === nextProps.children &&
        // prevProps.handler === nextProps.handler &&
        prevProps.icon === nextProps.icon &&
        prevProps.text === nextProps.text &&
        prevProps.title === nextProps.title

) 
