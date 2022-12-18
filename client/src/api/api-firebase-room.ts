import React from "react";
import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc, Firestore, QuerySnapshot } from "firebase/firestore";
import { IRoom } from "../types/types";



// ***************************read all rooms***************************
export const getRooms = async (db: Firestore, collectionName: string, set: (data: IRoom[]) => void) => {
    // для использования в запросе where и orderBy одновременно, возможно, 
    // надо будет проиндексировать БД, 
    // сгенерируется ошибка со ссылкой на индексирование БД
    //  let q = query(collection(db, "rooms"), where("uid", "==", user.uid), orderBy('createAT', 'desc'))
    let q = query(collection(db, collectionName), orderBy('createAT', 'desc'))
    const querySnapshot = await getDocs(q)
    let data: IRoom[] = []
    querySnapshot.forEach((doc) => {
        const { title, dateBegin, dateFinish, durationRound, createAT } = doc.data()
        data.push({ title, dateBegin, dateFinish, durationRound, createAT, id: doc.id })
        // data.push({ ...doc.data(), id: doc.id })
    })
    set(data)
}

// *****************************create room*****************************
// создание комнаты
export const saveRoom = async (db: Firestore, collectionName: string, itemRoom: IRoom) => {
    // setRooms([...rooms, itemRoom])
    console.log(itemRoom)
    try {
        const docRef = await addDoc(collection(db, "rooms"), {
            title: itemRoom.title,
            dateBegin: itemRoom.dateBegin,
            dateFinish: itemRoom.dateFinish,
            durationRound: itemRoom.durationRound,
            createAT: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
        // getRooms()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
// *****************************update room*****************************

