import React, { FC, memo } from 'react'
import style from './MyModal.module.less'

interface IMyModal {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    index?: number;
}

const RowMyModal: FC<IMyModal> = ({ children, visible, setVisible, index }) => {

    const rootClasses = [style.modal]
    if (visible) {
        rootClasses.push(style.active)
    }
    const rootClasses2 = [style.content]
    if (visible) {
        rootClasses2.push(style.active)
    }

    console.log('Render modal = ', index, visible)

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={rootClasses2.join(" ")} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export const MyModal = memo(RowMyModal,
    (prevProps, nextProps) => prevProps === nextProps
)