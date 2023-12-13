import {Alert, Button, Pagination, Spinner, Table} from "flowbite-react";
import {useNavigate, useParams} from "react-router-dom";
import Card from "./Card";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import RankRow from "./RankRow";
import Navbar from "./Navbar";
export default function Ranks(){
    const urlParams = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [failed,setFailed] = useState(false);
    const [data,setData] = useState({});
    const [pageNo,setPageNo] = useState(1);
    const searchInp = useRef();
    const [reload,setReload] = useState(false);
    const [home,setHome] = useState(true);
    useEffect(() => {
        setLoading(true);
        setHome(true);
        const url = "http://localhost:5000/ranks/"+urlParams.contestId+"?page="+(pageNo-1) * 25;
        axios.get(url)
            .then((res)=>{
                if(res.status === 200 && res.data.hasOwnProperty("ranks")){
                    setLoading(false);
                    setData(res.data);
                }else{
                    setFailed(true);
                }
            })
            .catch((err)=>{
                setFailed(true);
                setLoading(false);
                console.log(err);
            })
    }, [urlParams.contestId,pageNo,reload]);
    function handleSearch(){
        const userName = searchInp.current['value'].trim();
        if(userName.length === 0)return;
        setHome(false);
        setLoading(true);
        const url = "http://localhost:5000/ranks/"+urlParams.contestId+"/"+userName;
        axios.get(url)
            .then((res)=>{
                setData(res.data);
                setLoading(false);
            })
            .catch((err)=>{
                setFailed(true);
                setLoading(false);
                console.log(err);
            })
    }
    function handleBackButton(){
        searchInp.current.value = ''
        if(home)navigate('/');
        else setReload((prevState)=>!prevState);
    }
    let ranks = [];
    if(!loading && !failed) ranks = data['ranks'].map((value, index) => <RankRow key={index} rank={value[0]} userName={value[1]} oldRating={Math.ceil(value[3])} delta={Math.floor(value[2])} newRating={Math.floor(value[3] + value[2])}/>)
    return (
        <>
            <Navbar />
            <div style={{display:"flex",justifyContent:"center",marginTop:"20px",marginBottom:"5px"}}>
                <h1 style={{}}>{urlParams.contestName}</h1>
            </div>
            <div style={{display:"flex",margin:"20px 20px",justifyContent:"center"}}>
                <Button size={"xs"} color={"gray"} className={"mr-1"} onClick={handleBackButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                </Button>
                <input ref={searchInp} type="text" className={"bg-gray-50 rounded-lg border-gray-300 text-gray-900 text-sm"} placeholder={"Search"} onKeyDown={(e)=>e.key === "Enter" && handleSearch()}/>
                <Button size={"xs"} color={"gray"} className={"ml-1"} onClick={handleSearch} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                </Button>
            </div>
            <Card style={{margin: "20px 20px",display:loading?"flex":"none",justifyContent:"center"}}>
                <Spinner size={"xl"} color={"success"}/>
            </Card>
            <Alert color={"red"} className={"mx-10 my-10"} rounded style={{display:!failed && "none"}}>
                <span className="font-medium">Failed to Load Ranks</span> Try again after sometime
            </Alert>
            <Card style={{"margin": "20px 20px",display:(loading || failed) && "none"}}>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Rank</Table.HeadCell>
                        <Table.HeadCell>USER NAME</Table.HeadCell>
                        <Table.HeadCell>OLD RATING</Table.HeadCell>
                        <Table.HeadCell>DELTA</Table.HeadCell>
                        <Table.HeadCell>NEW RATING</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>{ranks}</Table.Body>
                </Table>
            </Card>
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                <Pagination style={{marginBottom: "50px",visibility:(failed ? "hidden":"visible")}} currentPage={pageNo}
                            onPageChange={(e) => setPageNo(e)}
                            totalPages={Math.max((data['total'] || 1) / 25, 1) }></Pagination>
                <span></span>
            </div>
        </>
    );
}