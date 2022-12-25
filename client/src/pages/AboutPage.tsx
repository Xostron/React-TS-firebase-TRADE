import React, { useRef, useEffect, useState, FC } from "react";


export const AboutPage: FC = () => {

    return (
        <div className="about">

            <h4 >О приложении:</h4>
            <p>
                Тестовое задание по созданию online-комнаты торгов (эффект online достигается при помощи hook-react-firebase)
                с таймером хода торгов (setInterval вызываемый из custom  hook)
            </p>

            <ul >
                <h4 >Технологический Stack</h4>
                <li>Frontend: React (functional components, hooks)+Typescript, css(less)</li>
                <li>Backend: google firebase - firestore database (сохранение данных о задаче), storage (сохранение файлов)</li>
                <li>Hoisting: firebase</li>
            </ul>

            <ul>
                <h4 >Исходный код:</h4>
                <li>
                    <a
                        href="https://github.com/Xostron/React-firebase-TRADE.git" target="_blank" >
                        GitHub: версия 1 - React (18.2.0)
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Xostron/React-TS-less-firebase-TRADE.git" target="_blank" >
                        GitHub: версия 2 - React (18.2.0) + Typescript
                    </a>
                </li>


                <h4 >Контактная информация</h4>
                <li>
                    <a
                        href="https://t.me/Xostron" target="_blank" >
                        Telegram: https://t.me/Xostron
                    </a>
                </li>
                <li>

                    <a
                        href="mailto://xostron8@gmail.com.subject=вакансия" target="_blank" >
                        Почта: xostron8@gmail.com
                    </a>
                </li>
            </ul>

        </div>
    )
}
