import React, { FC } from 'react'
import style from './MyModal.module.less'

interface IMyModal {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void
}

export const MyModal: FC<IMyModal> = ({ children, visible, setVisible }) => {

    const rootClasses = [style.modal]
    if (visible) {
        rootClasses.push(style.active)
    }
    const rootClasses2 = [style.content]
    if (visible) {
        rootClasses2.push(style.active)
    }

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={rootClasses2.join(" ")} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}