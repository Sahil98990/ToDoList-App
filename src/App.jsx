import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  // anfn 
  const toggleFinished = (e) => {
    setShowFinished(!ShowFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:w-[37%] md:mx-auto my-5 bg-violet-100 p-5 rounded-xl min-h-[80vh] drop-shadow-xl">

        <h1 className='font-bold text-center text-2xl font-serif'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold font-">Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 ' />
            <button onClick={handleAdd} disabled={todo.length < 1} className='bg-violet-800 hover:bg-violet-950 text-white rounded-lg text-sm p-3 py-1 mx-2'>Save</button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <input onChange={toggleFinished} type="checkbox" checked={ShowFinished} /> Show Finished
        </div>

        <div className='h-[1px] bg-zinc-700 my-3'></div>

        <h2 className='text-lg font-bold'>Your Todo's</h2>

        <div className="todos">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map(item => {
            return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-3'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white rounded-md text-sm p-3 py-1 mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white rounded-md text-sm p-3 py-1 mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
