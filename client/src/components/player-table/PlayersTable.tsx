import React, { FC, memo } from "react";
import { useEffect, useState, useContext, useMemo } from "react";
import { BtnText } from "../UI/button/btn-text/BtnText";
import { InputNumber } from "../UI/input/input-number/InputNumber";
import { InputText } from "../UI/input/input-text/InputText";
import style from './PlayersTable.module.less'
import { IPlayersTable } from "../../types/types";
import { updPlayer } from "../../api/api-firebase-players";
import { Loader } from "../UI/loader/Loader";
import { firebaseContext } from "../../context/MyContext";



interface IPlayersTableProps {
    props: IPlayersTable
}


const RowPlayersTable: FC<IPlayersTableProps> = ({ props }) => {

    const {
        players,
        you,
        changeHandler,
        uid,
        idRoom,
        isGuest
    } = props

    // ******************************Hooks******************************
    const { db } = useContext(firebaseContext)

    // ****************************Rendering****************************
    let partOneplayers = []
    !isGuest && partOneplayers.push({
        name: `Участник 1+`,
        email: you.userName || '(пусто)',
        online: you.online ? 'В сети' : 'Не в сети'
    })
    let partOtherPlayers = players.map((val, idx) => (
        {
            name: partOneplayers.length === 1 ? `Участник ${idx + 2}` : `Участник ${idx + 1}`,
            email: val.userName || '(пусто)',
            online: val.online ? 'В сети' : 'Не в сети'
        }))
    let templatePlayers = [...partOneplayers, ...partOtherPlayers]

    // ******************************Props******************************
    const propsRow1 = () => ({
        name: 'row1',
        placeholder: '...',
        value: you.row1,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)
    })
    const propsRow2 = () => ({
        name: 'row2',
        placeholder: '',
        value: you.row2,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)
    })
    const propsRow3 = () => ({
        name: 'row3',
        value: you.row3,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)
    })
    const propsRow4 = () => ({
        name: 'row4',
        value: you.row4,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)
    })
    const propsRow5_1 = () => ({
        name: 'row5_1',
        value: you.row5_1,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)
    })
    const propsRow5_2 = () => ({
        name: 'row5_2',
        value: you.row5_2,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)
    })
    const propsRow5_3 = () => ({
        name: 'row5_3',
        value: you.row5_3,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)
    })

    // ******************************Debug******************************
    // console.log('Render Table (Detail Page)',)

    return (
        <>
            {players && you ?
                <div>
                    <table>
                        {/* Заголовок */}
                        <thead>
                            <tr>
                                {/* столбцы */}
                                <th align="center">Параметры и требования</th>
                                {templatePlayers.map((val, idx) => {
                                    return (<th key={idx} align="center">
                                        <div className={style.column}>
                                            <span>{val.name}</span>
                                            <span>{val.email}</span>
                                        </div>
                                    </th>)
                                })}
                            </tr>
                        </thead>

                        {/* тело таблицы */}
                        <tbody>
                            {/* строка 1 */}
                            <tr>
                                {/* столбцы */}
                                <td>Наличие комплекса мероприятий, повышающих стандарты качества изготовления</td>
                                {!isGuest &&
                                    <td align='center'>
                                        <InputText props={propsRow1()} />
                                    </td>}
                                {players.map((val, idx) => {
                                    return (<td align='center' key={idx}>{val.row1}</td>)
                                })}
                            </tr>
                            {/* строка 2 */}
                            <tr>
                                <td>Срок изготовления лота, дней</td>
                                {!isGuest &&
                                    <td align='center' >
                                        <InputNumber props={propsRow2()} />
                                    </td>}
                                {players.map((val, idx) => {
                                    return (<td align='center' key={idx}>{val.row2}</td>)
                                })}
                            </tr>
                            {/* строка 3 */}
                            <tr>
                                <td>Гарантийные обязательства, мес</td>
                                {!isGuest &&
                                    <td align='center' >
                                        <InputNumber props={propsRow3()} />
                                    </td>}

                                {players.map((val, idx) => {
                                    return (
                                        <td align='center' key={idx}>
                                            {val.row3}
                                        </td>
                                    )
                                })}
                            </tr>
                            {/* строка 4 */}
                            <tr>
                                <td>Условия оплаты</td>
                                {!isGuest &&
                                    <td align='center' >
                                        <InputNumber props={propsRow4()} />
                                    </td>}

                                {players.map((val, idx) => {
                                    return (
                                        <td align='center' key={idx}>
                                            {val.row4}
                                        </td>
                                    )
                                })}
                            </tr>
                            {/* строка 5 */}
                            <tr>
                                <td>Стоимость изготовления лота, руб (без НДС)</td>
                                {!isGuest &&
                                    <td align='center' >

                                        <InputNumber props={propsRow5_1()} />
                                        <InputNumber props={propsRow5_2()} />
                                        <InputNumber props={propsRow5_3()} />

                                    </td>
                                }
                                {players.map((val, idx) => {
                                    return (
                                        <td align='center' key={idx}>
                                            <div className={style.column}>
                                                <span>{val.row5_1}</span>
                                                <span>{val.row5_2}</span>
                                                <span>{val.row5_3}</span>
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                            {/* строка 6 */}
                            <tr>
                                <td>Действия</td>
                                {!isGuest &&
                                    <td align='center'>
                                        <BtnText
                                            onClick={() => {
                                                console.log('UPD')
                                                updPlayer(db, 'players', you.uid, idRoom, you)
                                            }}>
                                            Подтвердить
                                        </BtnText>
                                    </td>}

                                {players.map((val, idx) => {
                                    return (<td align='center' key={idx}>
                                        -
                                    </td>)
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                :
                <Loader />
            }
        </>
    )

}

export const PlayersTable = memo(RowPlayersTable,
    // (prevProps, nextProps) => {
    //     // если длина не изменилась, делаем глубокую проверку
    //     if (prevProps.props.players.length === nextProps.props.players.length &&
    //         prevProps.props.idRoom === nextProps.props.idRoom &&
    //         prevProps.props.uid === nextProps.props.uid) {
    //         for (let i = 0; i < nextProps.props.players.length; i++) {
    //             // есть изменения - рендерим заново
    //             if (
    //                 prevProps.props.players[i].idRoom !== nextProps.props.players[i].idRoom ||
    //                 prevProps.props.players[i].createAT !== nextProps.props.players[i].createAT ||
    //                 prevProps.props.players[i].online !== nextProps.props.players[i].online ||
    //                 prevProps.props.players[i].row1 !== nextProps.props.players[i].row1 ||
    //                 prevProps.props.players[i].row2 !== nextProps.props.players[i].row2 ||
    //                 prevProps.props.players[i].row3 !== nextProps.props.players[i].row3 ||
    //                 prevProps.props.players[i].row4 !== nextProps.props.players[i].row4 ||
    //                 prevProps.props.players[i].row5_1 !== nextProps.props.players[i].row5_1 ||
    //                 prevProps.props.players[i].row5_2 !== nextProps.props.players[i].row5_2 ||
    //                 prevProps.props.players[i].row5_3 !== nextProps.props.players[i].row5_3 ||
    //                 prevProps.props.players[i].uid !== nextProps.props.players[i].uid ||
    //                 prevProps.props.players[i].userName !== nextProps.props.players[i].userName
    //             )
    //                 return false
    //         }
    //         // без изменений - перерендер не требуется
    //         return true
    //     }
    //     // иначе рендерим заново
    //     else { return false }
    // }


    (prevProps, nextProps) => prevProps.props === nextProps.props
)


    // *******************************State********************************
    // участники комнаты + пустые места
    // const [convertPlayers, setConvertPlayers] = useState<IPlayer[]>([])


    // *******************************EFFECT*******************************
    // участники комнаты + пустые места
    // useEffect(() => {
    //     let arrPlayers: IPlayer[] = []
    //     for (let i = 0; i < 5; i++) {
    //         if (i <= players.length - 1) {
    //             arrPlayers.push(players[i])
    //         }
    //         else {
    //             arrPlayers.push(emptyPlayers)
    //         }
    //     }
    //     setConvertPlayers(arrPlayers)
    //     console.log('Players Table EFFECT = ', convertPlayers)
    // }, [players])

    // *****************************Rendering******************************
    // преобразование участников для компонента (добавление инфо данных)


    // ****************************API firebase*****************************
    // обновить данные - игрок

    // *******************************HANDLER*******************************
    // const changeHandlerRow = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    //     // console.log(e.target.name, e.target.value)
    //     setConvertPlayers(convertPlayers.map((val, index) => index === idx ?
    //         { ...val, [e.target.name]: e.target.value } : val))
    // }