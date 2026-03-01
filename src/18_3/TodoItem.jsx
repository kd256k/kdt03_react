import { supabase } from "../supabase/client";
import TailButton from "../components/TailButton"
// import { todosAtom } from "./atomsTodo"
import { useState } from "react";


export default function TodoItem({todo, getTodos}) {
    // const setTodos = useSetAtom(todosAtom);
    const [isEdit, setIsEdit] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    
    // Re
    // prev.map
    // 현재 id값과 todo.id값 비교 , 같으면 완료배열 앞에 추가/ 아니면 미완료 배열 앞에 추가.
    // checked는 자동으로 변경 됨. 
    const handleToggle = async () => {
      const { error } = await supabase
            .from('todos')
            .update({ completed: !todo.completed })
            .eq('id', todo.id);
            if (error) {
            console.error('Error toggling todo:', error);
            } else {
            getTodos();
            }
    }

    const handleSave = async () => {
    const { error } = await supabase
      .from('todos')
      .update({ text: editText })
      .eq('id', todo.id);
    if (error) {
      console.error('Error toggling todo:', error);
    } else {
      getTodos();
      setIsEdit(false);
    }
  }

  const handleCancel = () => {
    setIsEdit(false);
    setEditText(todo.text);
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id);
    if (error) {
      console.error('Error deleting todo:', error);
    } else {
      getTodos();
    }
  }

  return (
    <div className="w-full max-w-3xl flex justify-center items-center 
                    my-4">
      <input type="checkbox"
        className="w-5 h-5 cursor-pointer"
        checked={todo.completed}
        onChange={handleToggle} />

      {isEdit ? <input type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="flex-1 p-2 mx-2 bg-gray-50 border border-gray-200
                        rounded-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
        : <span className={`flex-1 p-2 ${todo.completed ? "line-through" : ""}`}>
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