import { supabase } from "../supabase/client";
import TailButton from "../components/TailButton";
import { useRef } from "react";

export default function TodoInput({ getTodos }) {
  // const [todos, setTodos] = useState([]);
  const inRef = useRef();

  const handleAdd = async () => {
    if (inRef.current.value == "") {
      alert("값을 입력해주세요.");
      inRef.current.focus();
      return
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([
        { text: inRef.current.value, completed: false },
      ]);
    if (error) {
      console.error('Error adding todo:', error);
    } else {
      getTodos();
      inRef.current.value = "";
      inRef.current.focus();
    }
  }

 

return (
  <div className="w-full max-w-3xl flex justify-center items-center 
                    my-4">
    <input type="text"
      ref={inRef}
      className="flex-1 p-2 bg-gray-50 border border-gray-200
                        rounded-sm
                        focus:outline-none focus:ring-2 focus:ring-[#003675] focus:border-[#003675]" />

    <TailButton color="blue"
      caption="추가"
      onHandle={handleAdd} />
  </div>
)
}
//배열에 새로운 아이템 추가
//이전에 있는 값에 추가

//date.now()

// import { useSetAtom } from "jotai";
//  -> 세터만 가져옴

//(상위 영역에서 flex 사용한 경우), flex-1하면 해당 영역 제외한 영역 사이즈 자동으로 잡아줌

//input 사용시 닫는태그 단일 cf) <input />

//push사용 X