import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const TradeDetailPage: FC = () => {
    const id = useParams().id
    return (
        <div>
            Trade Detail Page {id}
        </div>
    )
}