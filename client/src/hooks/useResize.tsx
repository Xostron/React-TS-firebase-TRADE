import React, { FC, useState, useLayoutEffect, useRef, useEffect } from "react";

export const useResize = (callback: () => void, init: (size: number) => void) => {
    const updCallback = useRef<() => void>(callback)
    // подписка на callback обновление функции
    useLayoutEffect(() => {
        updCallback.current = callback
    }, [callback])

    // подписка на событие resize
    useLayoutEffect(() => {
        function watch() {
            updCallback.current()
        }
        window.addEventListener('resize', watch)
        init(3)
        return () => {
            window.removeEventListener('resize', watch)
        }
    }, [])

}