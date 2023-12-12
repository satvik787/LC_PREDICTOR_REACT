import {Table} from "flowbite-react";

export default function RankRow({rank,userName,oldRating,delta,newRating}){
    return (
        <Table.Row >
            <Table.Cell>{rank}</Table.Cell>
            <Table.Cell role={"button"} className={"text-blue-500 hover:underline focus:outline-none"} onClick={()=> window.open("https://leetcode.com/"+userName,"_blank")} >{userName}</Table.Cell>
            <Table.Cell>{oldRating}</Table.Cell>
            <Table.Cell className={"flex"} style={{backgroundColor:delta > 0 ? "#45be45":"#c75b5b"}}>
                <span className={"flex justify-center"} style={{color:"white"}}>{delta}</span>
            </Table.Cell>
            <Table.Cell>{newRating}</Table.Cell>
        </Table.Row>
    );
}