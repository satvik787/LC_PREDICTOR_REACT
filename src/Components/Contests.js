import {Alert, Pagination, Spinner, Table} from "flowbite-react";
import ContestRow from "./ContestRow";
import Card from "./Card";
import axios from "axios";
import {useEffect, useState} from "react";
import Navbar from "./Navbar";
export default function Contests(){
    const [loading, setLoading] = useState(true);
    const [failed,setFailed] = useState(false);
    const [data,setData] = useState({});
    const [pageNo,setPageNo] = useState(1);
    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then((res)=>{
                setData(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch((e)=>{
                console.log(e);
                setLoading(false);
                setFailed(true);
            })
    }, []);
    let tableBody,tableHead;
    if(loading){
        tableHead = (
            <Card style={{margin: "20px 20px",display:"flex",justifyContent:"center"}}>
                <Spinner size={"xl"} color={"success"}/>
            </Card>
        )
    }else{
        if(failed){
            tableBody = (
                <Alert color={"red"} className={"mx-10 my-10"} rounded>
                    <span className="font-medium">Failed to Load Contests</span> Try again after sometime
                </Alert>
            )
        }else {
            tableBody = data['contests'].map((value, index) => {
                return <ContestRow contestId={value[3]} predictedTime={value[5]} key={value[3]} contestTitle={value[0]} startedTime={value[2]} status={value[4]}
                                   ind={index + 1}/>
            })
        }
        tableHead = (
            <>
                <Card style={{margin: "20px 20px"}}>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>#</Table.HeadCell>
                            <Table.HeadCell>Contest Title</Table.HeadCell>
                            <Table.HeadCell>Started Time</Table.HeadCell>
                            <Table.HeadCell>Predicted Time</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>{tableBody}</Table.Body>
                    </Table>
                </Card>
                <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    <Pagination style={{marginBottom: "50px",visibility:(failed ? "hidden":"visible")}} currentPage={pageNo}
                                onPageChange={(e) => setPageNo(e)}
                                totalPages={Math.max(1, (data['total'] || 1) / 25)}></Pagination>
                    <span></span>
                </div>
            </>
        )
    }
    return (
        <>
            <Navbar/>
            {tableHead}
        </>
    );
}