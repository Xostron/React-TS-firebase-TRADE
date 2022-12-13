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