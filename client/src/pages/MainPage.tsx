import React, { FC, useContext } from "react";
import { CardTrade } from "../components/CardTrade/CardTrade";
import { firebaseContext } from "..";

export const MainPage: FC = () => {
    const { auth } = useContext(firebaseContext)
    return (

        <div>
            TradesPage
            {/* <CardTrade /> */}
        </div>
    )
}