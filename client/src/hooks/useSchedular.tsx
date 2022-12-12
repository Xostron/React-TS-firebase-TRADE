
import React, { FC, useState, useEffect, useRef } from "react";


// при изменении delay

export const useSchedular = (callback: () => void, delay?: number) => {

    const updCallback = useRef<() => void>(callback)

    const [currentTime, setCurrentTime] = useState<Date>(new Date())

    // подписка на callback
    useEffect(() => {
        updCallback.current = callback
    }, [callback])

    // подписка на delay и монтирование-запускается таймер, 
    // размонтирование - удаляется таймер
    useEffect(() => {
        function tick() {
            updCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    return { currentTime }
}

// заметка
// Не удается вызвать объект, который может иметь значение "undefined".ts(2722)
// updCallback.current?.()