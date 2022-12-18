import React, { useState, useEffect, useRef } from "react";


export const useSchedular = (callback: () => void, delay?: number) => {

    const updCallback = useRef<() => void>(callback)

    const [currentTime, setCurrentTime] = useState<string>(new Date().toString())

    // подписка на callback
    useEffect(() => {
        updCallback.current = callback
    }, [callback])

    // подписка на delay и монтирование - запуск таймера, 
    // размонтирование - удаляется таймер
    useEffect(() => {
        function tick() {
            updCallback.current();
            setCurrentTime(new Date().toString())
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