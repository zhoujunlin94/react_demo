import { useState } from "react";
import { useImmer } from "use-immer";

let nextId = 0

export function List(){
  const [name, setName] = useState('')
  const [artists, setArtists] = useState([])

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input value={name} onChange={e=> setName(e.target.value)}/>
      <button onClick={()=>{
        setArtists([
          ...artists,
          { id: nextId++, name: name, }
        ])
      }}>添加</button>
      <ul>
        {artists.map(a=> {
          return (
          <li key={a.id}>{a.name} {' '}
            <button onClick={() => {
              setArtists(artists.filter(a2 => {
                return a2.id !== a.id
              }))
            }}>删除</button>
          </li>
        )
        })}
      </ul>
    </>
  );
}


let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];
export function ShapeEditor(){
  const [shapes, setShapes] = useState(initialShapes)

  return (
    <>
      <button onClick={()=>{
        setShapes(shapes.map(s=>{
          if(s.type === 'circle'){
            return {...s, y: s.y+50}
          }
          return s;
        }))
      }}>所有圆形向下移动</button>
      {shapes.map(s=>{
        return (<div 
          key = {s.id}
          style={{
            background: 'red',
            position: 'absolute',
            left: s.x,
            top: s.y,
            borderRadius: s.type === 'circle' ? '50%' : '',
            width: 20,
            height: 20,
          }}    
           />
        )
      })
      }
    </>
  );
}


function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}


const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, updateYourList] = useImmer(initialList);

  function handleToggleMyList(artworkId, nextSeen) {
    // const myNextList = [...myList];
    // const artwork = myNextList.find(
    //   a => a.id === artworkId
    // );
    // // 问题：数组内元素引用是同一个  直接修改会印象其它
    // artwork.seen = nextSeen;
    // setMyList(myNextList);

    setMyList(myList.map(m=>{
      if(m.id===artworkId){
        return {...m, seen: nextSeen}
      }
      return m
    }))

  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft=>{
      const you = draft.find(y=> y.id === artworkId)
      you.seen = nextSeen
    })
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}