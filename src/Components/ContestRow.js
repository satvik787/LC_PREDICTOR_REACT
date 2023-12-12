import { Table} from "flowbite-react";
import {useNavigate} from "react-router-dom";

export default function ContestRow({ind,startedTime,predictedTime,contestTitle,status,contestId}){
    const navigate = useNavigate();
    let statusName;
    if(status === 0)statusName = "Fetching Ranks";
    else if(status === 1)statusName = "Ranks Fetched";
    else if(status === 2)statusName = "Rating Predicted";
    return (
        <Table.Row >
            <Table.Cell>{ind}</Table.Cell>
            <Table.Cell onClick={()=>status === 2 && navigate("/ranks/"+contestTitle+"/"+contestId)} role={"button"} className={"text-blue-500 hover:underline focus:outline-none"}>{contestTitle}</Table.Cell>
            <Table.Cell>{startedTime}</Table.Cell>
            <Table.Cell>{predictedTime}</Table.Cell>
            <Table.Cell >{statusName}</Table.Cell>
        </Table.Row>
    )
}