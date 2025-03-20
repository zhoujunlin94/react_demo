import { useRef, useState } from "react";



export default function FocusInput() {
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
