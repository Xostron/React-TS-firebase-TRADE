import { createContext } from "react";
import { Auth } from "firebase/auth"
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from 'firebase/storage'
import { IPlayer } from "../types/types";

export interface IFirebaseContext {
    auth: Auth,
    db: Firestore,
    storage: FirebaseStorage
}
export const firebaseContext = createContext<IFirebaseContext>({} as IFirebaseContext)

interface IRoomContext {
    updYou: boolean;
    setUpdYou: (val: boolean) => void;
    you: IPlayer;
    setYou: (val: IPlayer) => void;
    modalRoom: boolean;
    setModalRoom: (val: boolean) => void
}
export const RoomContext = createContext<IRoomContext>({} as IRoomContext)