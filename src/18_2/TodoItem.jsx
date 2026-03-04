
import TailButton from "../components/TailButton"
// import { todosAtom } from "./atomsTodo"
import { useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ;

export default function TodoItem({todo, getTodos}) {
  const [isEdit , setIsEdit] = useState(false) ;
  const [editText, setEditText] = useState(todo.text) ;
    
    // Re
    // prev.map
    // 현재 id값과 todo.id값 비교 , 같으면 완료배열 앞에 추가/ 아니면 미완료 배열 앞에 추가.
    // checked는 자동으로 변경 됨. 
//     const handleToggle = () => {
//        const newItem = todos.map(t => t.id == todo.id ?    
//                              {...t, completed : !todo.completed} : t);
//        setTodos(newItem);
//     }

    // 저장
    const handleToggle = async() => {
    const resp = await fetch(`${supabaseUrl}/rest/v1/todos?id=eq.${todo.id}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json' 
      },
      body : JSON.stringify({completed : !todo.completed})
    });
     
    if (resp.ok) {
      getTodos() ; 
    }
    else {
      console.log(resp.statusText);
    }
  }

  const handleSave = async() => {
    const resp = await fetch(`${supabaseUrl}/rest/v1/todos?id=eq.${todo.id}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json' 
      },
      body : JSON.stringify({text : editText})
    });
     
    if (resp.ok) {
      getTodos() ; 
      setIsEdit(false) ;
    }
    else {
      console.log(resp.statusText);
    }
  }

  const handleCancel = () => {
    setIsEdit(false) ;
    setEditText(todo.text) ;
  }

  const handleDelete = async() => {
    const resp = await fetch(`${supabaseUrl}/rest/v1/todos?id=eq.${todo.id}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}` 
      } 
    });
     
    if (resp.ok) {
      getTodos() ;  
    }
    else {
      console.log(resp.statusText);
    }
  }
  return (
    <div className="w-full max-w-3xl flex justify-center items-center 
                    my-4">
      <input type="checkbox"
             className="w-5 h-5 cursor-pointer"
             checked={todo.completed}
             onChange={handleToggle} />

      { isEdit ? <input type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 p-2 mx-2 border border-gray-200
                        rounded-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
               : <span className={`flex-1 p-2 ${ todo.completed ? "line-through" : ""}`}>
                  {todo.text}
                </span>
      }
      {
        isEdit ? <>
                  <TailButton color="lime" 
                        caption="저장"
                        onHandle={handleSave} />
                  <TailButton color="orange" 
                        caption="취소"
                        onHandle={handleCancel} />
                 </>
               : <>
                  <TailButton color="lime" 
                        caption="수정"
                        onHandle={() => setIsEdit(true)} />
                  <TailButton color="orange" 
                        caption="삭제"
                        onHandle={handleDelete} />
                 </>
      }
      
    </div>
  )
}

//Atom함수들 사용 시, atomsTodo.js에 있는 (파라미터, 변수 등등 )만 사용가능. 

// 수정버튼 : 수정상태 인지 아닌지 구분.
       // ( 수정상태O -> text input 상자 나타나기,  
       //                저장 -> atom 배열에 추가됨 )

       //                취소 -> handleCancel, setEditText


       // ( 삭제        -> atom 배열에서 삭제됨 )

       // 새로고침 -> 원복 



// 글에 선 긋기  /  {` ${}`} 중괄호 -> 백틱 -> 달러 -> 중괄호
// <span ClassName={`flex-1 p-2 ${todo.completed ? " line-through"
//                                  : ""}`}>
// {todo.text}
// </span>

// onHandle= ( () => { isEdit? handleSave ? {} : handleCancel})
//             

//  onHandle=((handleDelete) => {})