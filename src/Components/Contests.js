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
    const [refresh,setRefresh] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then((res)=>{
                setData(res.data);
                setLoading(false);
                setFailed(false);
            })
            .catch((e)=>{
                console.log(e);
                setLoading(false);
                setFailed(true);
            })
    }, [refresh]);
    let contests = [];
    if(!loading && !failed){
    contests = data['contests'].map((value, index) => {
        return <ContestRow contestId={value[3]} predictedTime={value[5]} key={value[3]} contestTitle={value[0]} startedTime={value[2]} status={value[4]}
                           ind={index + 1}/>
        })
    }
    return (
        <>
            <Navbar cb={()=>setRefresh((prevState)=>!prevState)}/>
            <Card style={{margin: "20px 20px",display:loading ? "flex":"none",justifyContent:"center"}}>
                <Spinner size={"xl"} color={"success"}/>
            </Card>
            <Alert color={"red"} className={"mx-10 my-10"} style={{display:!failed && "none"}} rounded>
                <span className="font-medium">Failed to Load Contests</span> Try again after sometime
            </Alert>
            <Card style={{margin: "20px 20px",display:(loading || failed) && "none"}}>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Contest Title</Table.HeadCell>
                        <Table.HeadCell>Started Time</Table.HeadCell>
                        <Table.HeadCell>Predicted Time</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>{contests}</Table.Body>
                </Table>
            </Card>
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                <Pagination style={{marginBottom: "50px",visibility:(failed ? "hidden":"visible")}} currentPage={pageNo}
                            onPageChange={(e) => setPageNo(e)}
                            totalPages={Math.max(1, (data['total'] || 1) / 25)}></Pagination>
                <span></span>
            </div>
        </>
    );
}