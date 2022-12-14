import React, { FC } from "react";
import { useEffect, useState, useContext } from "react";
import { BtnText } from "../UI/button/btn-text/BtnText";
import { InputNumber } from "../UI/input/input-number/InputNumber";
import { InputText } from "../UI/input/input-text/InputText";
import style from './PlayersTable.module.less'
import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseContext } from "../..";
import { IPlayer, IPlayersTable } from "../../types/types";
import { updPlayer } from "../../api/api-firebase-players";



interface IPlayersTableProps {
    props: IPlayersTable
}
const emptyPlayers: IPlayer = {
    idRoom: '',
    uid: '',
    userName: '',
    row1: '',
    row2: 0,
    row3: 0,
    row4: 0,
    row5_1: 0,
    row5_2: 0,
    row5_3: 0,
    online: false,
    createAT: ''
}
export const PlayersTable: FC<IPlayersTableProps> = ({ props }) => {

    const {
        players,
        uid,
        idRoom,
        isOpen
    } = props
    // ******************************Firebase******************************
    const { db } = useContext(firebaseContext)

    // *******************************State********************************
    // участники комнаты + пустые места
    const [convertPlayers, setConvertPlayers] = useState<IPlayer[]>([])

    // *******************************EFFECT*******************************
    // участники комнаты + пустые места
    useEffect(() => {
        const arrPlayers: IPlayer[] = []
        for (let i = 0; i < 5; i++) {
            if (i <= players.length - 1) {
                arrPlayers.push(players[i])
            }
            else {
                arrPlayers.push(emptyPlayers)
            }
        }
        setConvertPlayers(arrPlayers)
    }, [players])

    // *****************************Rendering******************************
    // преобразование участников для компонента (добавление инфо данных)
    const templatePlayers = convertPlayers.map((val, idx) => (
        {
            name: `Участник ${idx + 1}`,
            email: val.userName || '(пусто)',
            online: val.online ? 'В сети' : 'Не в сети'
        }))

    // ****************************API firebase*****************************
    // обновить данные - игрок


    // *******************************HANDLER*******************************
    const changeHandlerRow = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        // console.log(e.target.name, e.target.value)
        setConvertPlayers(convertPlayers.map((val, index) => index === idx ?
            { ...val, [e.target.name]: e.target.value } : val))
    }

    // ***************************PROPS Rendering***************************
    const propsRow1 = (idx: number) => ({
        name: 'row1',
        placeholder: '...',
        value: convertPlayers[idx].row1,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandlerRow(e, idx)
    })
    const propsRow2 = (idx: number) => ({
        name: 'row2',
        value: convertPlayers[idx].row2,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandlerRow(e, idx)
    })
    const propsRow3 = (idx: number) => ({
        name: 'row3',
        value: convertPlayers[idx].row3,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandlerRow(e, idx)
    })
    const propsRow4 = (idx: number) => ({
        name: 'row4',
        value: convertPlayers[idx].row4,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandlerRow(e, idx)
    })
    const propsRow5_1 = (idx: number) => ({
        name: 'row5_1',
        value: convertPlayers[idx].row5_1,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandlerRow(e, idx)
    })
    const propsRow5_2 = (idx: number) => ({
        name: 'row5_2',
        value: convertPlayers[idx].row5_2,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandlerRow(e, idx)
    })
    const propsRow5_3 = (idx: number) => ({
        name: 'row5_3',
        value: convertPlayers[idx].row5_3,
        changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => changeHandlerRow(e, idx)
    })

    // console.log('TABLE =', convertPlayers, players, isOpen)
    return (
        <div>
            <table>
                {/* Заголовок */}
                <thead>
                    <tr>
                        {/* столбцы */}
                        <th align="center">Параметры и требования </th>
                        {templatePlayers.map((val, idx) => {
                            return (<th key={idx} align="center">
                                <div className={style.column}>
                                    <span>{val.name}</span>
                                    <span>{val.email}</span>
                                    {/* <span style={{ fontWeight: '400' }}>{val.online}</span> */}
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
                        {convertPlayers.map((val, idx) => {
                            return (
                                <td align='center' key={idx}>
                                    {val.uid === uid ?
                                        <InputText props={propsRow1(idx)} />
                                        :
                                        <>{val.row1}</>}
                                </td>
                            )
                        })}
                    </tr>
                    {/* строка 2 */}
                    <tr>
                        <td>Срок изготовления лота, дней</td>
                        {convertPlayers.map((val, idx) => {
                            return (
                                <td align='center' key={idx}>
                                    {val.uid === uid ?
                                        <InputNumber props={propsRow2(idx)} />
                                        :
                                        <>{val.row2}</>}
                                </td>
                            )
                        })}
                    </tr>
                    {/* строка 3 */}
                    <tr>
                        <td>Гарантийные обязательства, мес</td>
                        {convertPlayers.map((val, idx) => {
                            return (
                                <td align='center' key={idx}>
                                    {val.uid === uid ?
                                        <InputNumber props={propsRow3(idx)} />
                                        :
                                        <>{val.row3}</>}
                                </td>
                            )
                        })}
                    </tr>
                    {/* строка 4 */}
                    <tr>
                        <td>Условия оплаты</td>
                        {convertPlayers.map((val, idx) => {
                            return (
                                <td align='center' key={idx}>
                                    {val.uid === uid ?
                                        <InputNumber props={propsRow4(idx)} />
                                        :
                                        <>{val.row4}</>}
                                </td>
                            )
                        })}
                    </tr>
                    {/* строка 5 */}
                    <tr>
                        <td>Стоимость изготовления лота, руб (без НДС)</td>
                        {convertPlayers.map((val, idx) => {
                            return (
                                <td align='center' key={idx}>
                                    {val.uid === uid ?
                                        <>
                                            <InputNumber props={propsRow5_1(idx)} />
                                            <InputNumber props={propsRow5_2(idx)} />
                                            <InputNumber props={propsRow5_3(idx)} />
                                        </>
                                        :
                                        <div className={style.column}>
                                            <span>{val.row5_1}</span>
                                            <span>{val.row5_2}</span>
                                            <span>{val.row5_3}</span>
                                        </div>}
                                </td>
                            )
                        })}
                    </tr>
                    {/* строка 6 */}
                    <tr>
                        <td>Действия</td>
                        {convertPlayers.map((val, idx) => {
                            return (<td align='center' key={idx}>
                                {val.uid === uid ?
                                    <BtnText
                                        onClick={() => {
                                            console.log('UPD')
                                            updPlayer(idx, db, 'players', uid, idRoom, convertPlayers)
                                        }}>
                                        Подтвердить
                                    </BtnText>
                                    :
                                    <></>}

                            </td>)
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}