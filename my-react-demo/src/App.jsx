import { useRef, useState, forwardRef } from "react";
import { flushSync } from 'react-dom'





export default function TodoList() {
    const listRef = useRef(null);
    const [text, setText] = useState('');
    const [todos, setTodos] = useState(
      initialTodos
    );
  
    function handleAdd() {
      const newTodo = { id: nextId++, text: text };
      setText('');
      //setTodos([ ...todos, newTodo]);
      
      // flushSync会让react立即更新DOM
      flushSync(()=> {
        setTodos([ ...todos, newTodo]);
      })

      // 更新state操作是进入队列  不会立即更新DOM 所以下面这个操作会滑动到lastChild-1的元素未知
      listRef.current.lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  
    return (
      <>
        <button onClick={handleAdd}>
          添加
        </button>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <ul ref={listRef}>
          {todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </>
    );
  }
  
let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
initialTodos.push({
    id: nextId++,
    text: '待办 #' + (i + 1)
});
}
  




const MyInput = forwardRef((props, ref)=>{
    return <input {...props} ref={ref}/>
});

export function FocusInput2(){
    const input = useRef(null)

    function handleClick(){
        input.current.focus()
    }

    return (
        <>
            <MyInput ref={input} />
            <button onClick={handleClick}>聚焦输入框</button>
        </>
    )
}



export function FocusInput() {
    const input = useRef(null)

    function handleClick(){
        input.current.focus()
    }

    return (
        <>
            <input ref={input}></input>
            <button onClick={handleClick}>聚焦输入框</button>
        </>
    )
}


export function StopWatch() {
    const [now, setNow] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const intervalId = useRef(null)

    function handleStart() {
        clearInterval(intervalId.current)
        setStartTime(new Date())
        setNow(new Date())
        intervalId.current = setInterval(() => {
            setNow(new Date())
        }, 100)
    }

    function handleStop() {
        clearInterval(intervalId.current)
    }

    const secondPassed = (now - startTime) / 1000;
    return (
        <>
            <h1>时间过去了：{secondPassed.toFixed(3)}</h1>
            <button onClick={handleStart}>开始</button>
            <button onClick={handleStop}>停止</button>
        </>
    )
}



export function Click() {
    const num = useRef(0)

    // 只会打印一次  不会在num改变时重新渲染这个组件（与state不同）
    console.log(num)

    function handleClick() {
        num.current = num.current + 1
        alert('点击了' + num.current + "次")
    }
    return (
        <button onClick={handleClick}>点击我！</button>
    )
}
