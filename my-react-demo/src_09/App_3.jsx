// import { useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';

export default function TaskApp() {
  // const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [tasks, dispatch] = useImmerReducer(taskImmerReducer, initialTasks);

  function handleAddTask(text) {
    if(text){
      dispatch({
        type: 'add',
        id: nextId++,
        text: text,
      });
    }
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'change',
      task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'delete',
      taskId
    })
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];


function taskReducer(tasks, action){
  console.log(action)
  switch (action.type){
    case 'add':{
      return [...tasks, {id: action.id, text: action.text, done:false}]
    }
    case 'change':{
      return tasks.map(t=> {
        if(t.id === action.task.id){
          return action.task
        }
        return t
      })  
    }
    case 'delete':{
      return tasks.filter(t=> t.id !== action.taskId)
    }
    default:{
      throw new Error('未知类型')
    }
  }
}


function taskImmerReducer(draft, action){
  console.log(action)
  switch (action.type){
    case 'add':{
      draft.push({id: action.id, text: action.text, done:false})
      break
    }
    case 'change':{
      const idx = draft.findIndex(d=> d.id === action.task.id)
      draft[idx] = action.task
      break  
    }
    case 'delete':{
      return draft.filter(t=> t.id !== action.taskId)
    }
    default:{
      throw new Error('未知类型')
    }
  }
}