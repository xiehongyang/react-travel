import React from "react";
import {useParams} from "react-router-dom";

type MatchParams = {
    touristRouteId: string;
}

export const DetailPage: React.FC = () => {
    let params = useParams<MatchParams>();
    return <h1>路线详情页面，路线ID：{params.touristRouteId}</h1>
}