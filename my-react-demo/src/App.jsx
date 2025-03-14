
function Button({handleClick, children}){
  return (
    <button onClick={e=>{
      e.stopPropagation()
      handleClick();
    }}>{children}</button>
  );
}


export default function Toolbar(){

  function click(){
    alert('已上传')
  }

  return (
    <div className="Toolbar" onClick={()=>alert("点击Toolbar")}>
        <Button handleClick={()=> alert('已播放')}>播放电影</Button>
        <Button handleClick={click}>上传图片</Button>
    </div>
  );
}