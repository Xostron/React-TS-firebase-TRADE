export interface IRoom {
    id: string;
    dateBegin: Date;
    dateFinish: Date;
    durationRound: number;
    title: string;
    summaryRounds: number;
    currRound: number;
}

export interface IPlayer {
    id: string;
    name: string;
    mail: string;
}