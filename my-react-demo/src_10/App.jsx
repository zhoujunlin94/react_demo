import { useEffect, useRef, useState } from "react"
import { createConnection } from './chat'


export default function ChatRoom() {

    // 开发环境  严格模式  会加载-卸载-加载
    useEffect(() => {
        const conn = createConnection()
        conn.connect()

        // 清理函数  每次重新运行/组件卸载时会执行
        return () => {  
            conn.disconnect()
        }
    }, [])

    return <h1>欢迎来到聊天室</h1>
}



function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null)

    // 渲染(任意state发生变化)之后执行 
    useEffect(() => {
        if (isPlaying) {
            console.log('播放');
            ref.current.play()
        } else {
            console.log('暂停');
            ref.current.pause()
        }
    }, [isPlaying])  // 只依赖isPlaying发生变化时触发  []表示组件首次挂载时运行

    return (<video ref={ref} src={src} loop playsInline />)
}


export function VideoApp() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [text, setText] = useState('')
    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? '暂停' : '播放'}
            </button> <br />
            <VideoPlayer isPlaying={isPlaying}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
        </>
    )
}