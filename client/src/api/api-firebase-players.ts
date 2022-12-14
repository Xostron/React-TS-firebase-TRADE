import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc, Firestore, QuerySnapshot } from "firebase/firestore";
import { IPlayer } from "../types/types";

// ***************************read all players***************************
export const getPlayers = async (db: Firestore, collectionName: string, idRoom: string) => {
    try {
        let q = query(collection(db, collectionName),
            where("idRoom", "==", idRoom))
        const querySnapshot = await getDocs(q)
        let data: IPlayer[] = []
        querySnapshot.forEach((doc) => {
            const { idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT } = doc.data()
            data.push({ idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT })
        })
        return data
    } catch (error) { }
}


export const updPlayer = async (idx: number, db: Firestore, collectionName: string, uid: string, idRoom: string, convertPlayers: IPlayer[]) => {
    // получить id players-room
    let q = query(collection(db, collectionName), where("uid", "==", uid), where('idRoom', '==', idRoom))
    const querySnapshot = await getDocs(q)

    let idConnect = ''
    querySnapshot.forEach((doc) => {
        idConnect = doc.id
    })

    // обновить
    const DocRef = doc(db, collectionName, idConnect);
    await updateDoc(DocRef,
        {
            row1: convertPlayers[idx].row1,
            row2: Number(convertPlayers[idx].row2),
            row3: Number(convertPlayers[idx].row3),
            row4: Number(convertPlayers[idx].row4),
            row5_1: Number(convertPlayers[idx].row5_1),
            row5_2: Number(convertPlayers[idx].row5_2),
            row5_3: Number(convertPlayers[idx].row5_3),
            // online: convertPlayers[idx].online,
        });
}