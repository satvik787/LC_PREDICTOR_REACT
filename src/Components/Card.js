export default function Card({children,style}) {
    return (
        <div style={{padding:"16px",borderRadius:"10px",boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",transition:"0.3s",backgroundColor:"#ececec",...style}}>
            {children}
        </div>
    );
}