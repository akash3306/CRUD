import { useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
const [isFormOpen, setIsFormOpen] = useState(false);
//   useEffect(() => {
//     let todoString = localStorage.getItem("todos")
//     if(todoString){
//       let todos = JSON.parse(localStorage.getItem("todos")) 
//       setTodos(todos)
//     }
//   }, [])
  

//   const saveToLS = (params) => {
//     localStorage.setItem("todos", JSON.stringify(todos))
//   }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    // saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    // saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    setIsFormOpen(false);
    // saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    // saveToLS()
  }

  function handleToggleForm() {
    setIsFormOpen(!isFormOpen);
  }
  return (
    <div div className='main'>
       <div className="Todo">
       <div className="Add">
          <h2>Add a Todo</h2>
        <button onClick={handleToggleForm}>Add a Todo</button>
       </div>
       {isFormOpen && (
      <form>
          <input  onChange={handleChange} value={todo} type="text"  />
          <button onClick={handleAdd} disabled={todo.length<=3}>Save</button>
      </form>
    )}
      
         <input   onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label >Show Finished</label> 
         <div ></div>
         <h2 >Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id}>
            <div className='check'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div>{item.todo}</div>
            </div>
            <div >
              <button onClick={(e)=>handleEdit(e, item.id)} >edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} >delete</button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
    </div>
  )
}

export default App




