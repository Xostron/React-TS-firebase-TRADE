import { Auth, User } from "firebase/auth";
import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc, Firestore, QuerySnapshot } from "firebase/firestore";
import { IPlayer } from "../types/types";

// ***************************read all players***************************
export const getPlayers = async (db: Firestore, collectionName: string, idRoom: string) => {
    try {
        let q = query(collection(db, collectionName),
            where("idRoom", "==", idRoom))
        const querySnapshot = await getDocs(q)
        let data = [] as IPlayer[]
        querySnapshot.forEach((doc) => {
            const { idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT } = doc.data()
            data.push({ idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT })
        })
        return data
    } catch (error) { }
}


export const updPlayer = async (db: Firestore, collectionName: string, uid: string, idRoom: string, yourself: IPlayer) => {
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
            row1: yourself.row1,
            row2: Number(yourself.row2),
            row3: Number(yourself.row3),
            row4: Number(yourself.row4),
            row5_1: Number(yourself.row5_1),
            row5_2: Number(yourself.row5_2),
            row5_3: Number(yourself.row5_3),
            // online: convertPlayers[idx].online,
        });
}

// запрос являюсь ли участником комнаты
export const isMyRoom = async (db: Firestore, collectionName: string, idRoom: string, uid: string) => {
    try {
        console.log('isMyRoom API = ', collectionName, idRoom, uid)
        let q = query(collection(db, collectionName),
            where("idRoom", "==", idRoom),
            where("uid", "==", uid))
        const querySnapshot = await getDocs(q)
        let data: IPlayer[] = []
        querySnapshot.forEach((doc) => {
            const { idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT } = doc.data()
            data.push({ idRoom, uid, userName, row1, row2, row3, row4, row5_1, row5_2, row5_3, online, createAT })
        })
        console.log('data = ', data)
        if (data.length) return true
        return false
    } catch (error) {
        return false
    }
}

// создание участника комнаты (Войти как участник)
export const savePlayer = async (db: Firestore, collectionName: string, idRoom: string, user: User) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            idRoom: idRoom,
            uid: user.uid,
            userName: user.email,
            row1: '',
            row2: 0,
            row3: 0,
            row4: 0,
            row5_1: 0,
            row5_2: 0,
            row5_3: 0,
            online: true,
            createAT: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
        // присваиваем id Комнате для последующих операций обновления
        // setRooms
        // setTasks(tasks.map((val, index) => index === idx ? { ...val, id: docRef.id } : val))
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
