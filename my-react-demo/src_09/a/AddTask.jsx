import { useState } from 'react';
import { useDispatch } from './Context'

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useDispatch()
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }}>Add</button>
    </>
  )
}

let nextId = 3;