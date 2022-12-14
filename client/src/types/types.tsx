export interface IRoom {
    id: string,
    title: string,
    dateBegin: string,
    dateFinish: string,
    durationRound: string,
    createAT: string
}

export interface IRoomComponent {
    idx: number,
    room: IRoom,
    handlerEnterAsWatch: (idx: number) => void,
    handlerEnterAsPlayer: (idx: number) => void,
}

export interface ILink {
    name: string,
    icon: string,
    to: string,
    type: string,
    disabled: boolean
}

export interface IPlayer {
    idRoom: string,
    uid: string,
    userName: string,
    row1: string,
    row2: number,
    row3: number,
    row4: number,
    row5_1: number,
    row5_2: number,
    row5_3: number,
    online: boolean,
    createAT: string
}

export interface IPlayersTable {
    players: IPlayer[],
    uid: string | null,
    idRoom: string,
    isOpen: boolean
}