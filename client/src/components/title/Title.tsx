import React, { FC, useEffect, memo, useMemo } from 'react'
import { HandySvg } from 'handy-svg'
import style from './Title.module.less'



interface ITitle {
    children?: React.ReactNode,
    icon?: string,
    handler?: () => void,
    title?: String,
    text?: String,
}

const RowTitle: FC<ITitle> = ({ title, children, icon, handler, text }) => {

    console.log('Render Title')


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


export const Title = memo<ITitle>(RowTitle,
    // предикат - функция, возвращающая true||false (false - отрендерить, true - нет)
    (prevProps, nextProps) =>
        prevProps.children === nextProps.children &&
        prevProps.handler === nextProps.handler &&
        prevProps.icon === nextProps.icon &&
        prevProps.text === nextProps.text &&
        prevProps.title === nextProps.title
)

// У компонета Title имеется children (кнопка Авторизации она мемоизирована - делает перерендер по предикату)
// Title всегда рендериться, потому что children каждый раз новый, не смотря на то, что это pureComponent
// если не проверять children, то rerender прекратиться, но и данные для children замкнуться и он также перестанет обновляться (rerender)