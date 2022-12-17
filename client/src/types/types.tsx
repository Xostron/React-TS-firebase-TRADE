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
    createAT: string,
    mySync?: boolean

}

export interface IPlayersTable {
    players: IPlayer[],
    you: IPlayer,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    uid: string | null,
    idRoom: string,
    isGuest: boolean
}

export interface IInputText {
    name: string,
    placeholder?: string,
    autoFocus?: boolean,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string
}

export interface IInputDate {
    name: string,
    value: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon?: string,
    placeholder?: string,
    blurHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checked?: boolean,
    propsSchedular?: { state: string }
}

export interface IAreatext {
    name: string,
    placeholder: string,
    changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    value: string,
    autofocus: boolean,
}
export interface IInputNumber {
    name: string,
    placeholder?: string,
    value?: number,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
export interface IInputHMS {
    name: string,
    placeholder?: string,
    value: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export interface IDetailPage {
    room?: IRoom;
    uid: string | null;
    isGuest: boolean;
}

export interface ICardFormCreate {
    itemRoom: IRoom,
    saveRoomHandler: () => void,
    setModalCreate: (state: boolean) => void,
    propsAreaTitle: IAreatext,
    propsDateBegin: IInputDate,
    propsDateFinish: IInputDate,
    propsDuration: IInputHMS
}