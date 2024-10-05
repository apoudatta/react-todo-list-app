import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) { 
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => { 
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    // delete old todo
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => { 
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage()
  }



  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">

        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className='w-1/2 rounded-md h-9' />
          <button onClick={handleAdd} disabled={ todo.length<3 } className='bg-violet-800 h-9 hover:bg-violet-950 disabled:bg-slate-400 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
        </div>

        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished
        
        <h2 className='text-lg font-bold mt-4'>Your Todos</h2>

        <div className='todos'>
          { todos.length === 0 && <div className='m-5'>No Todos to display</div> }
          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className={'todo flex w-2/4 my-3 justify-between'}>
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              
              <div className='buttons'>
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
            
          })}
        </div>
      </div>
    </>
  )
}

export default App
