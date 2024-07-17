import React from "react";
import { useEffect, useState } from "react";
import { faPen,faTrash,faCheck,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { text } from "@fortawesome/fontawesome-svg-core";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

class dataHandling{
  constructor(props,todo,datetime,add_btn,setBtnClick){
    this.props = props;
    this.todo = todo;
    this.datetime = datetime;
    this.add_btn = add_btn;
    this.setBtnClick = setBtnClick;
  }

  delete_all(){
    console.log("Delete all data called!!");
    this.props.setData([]);
  }

  add_data(){
    let props = this.props;
    console.log("Add data called!!");
    let text = document.getElementById(this.todo);
    let date = document.getElementById(this.datetime);
    let text_arr = text.value.split(" ");
    let id;
    // console.log(text_arr);
    // console.log(text_arr.length);
    // console.log(Math.floor(Math.random() * 900) + 100);

    // console.log(text_arr[0] + Math.floor(Math.random() * 900) + 100);
    // console.log(text_arr[1] + text_arr[text_arr.length - 1] + Math.floor(Math.random() * 900) + 100);
    // console.log(Math.floor(Math.random() * 9000) + 1000);
    if(text_arr.length == 1){
      id = text_arr[0] + Math.floor(Math.random() * 900) + 100;
    }
    else if(text.value != ""){
      id = text_arr[0] + text_arr[text_arr.length - 1] + Math.floor(Math.random() * 900) + 100;
    }
    else{
      id = Math.floor(Math.random() * 9000) + 1000;
    }

    props.setData([...props.data,{
      id: id,
      todo: text.value,
      date: date.value,
      status: "pending",
    }]);

    text.value = "";
    date.value = "";

  }

  async todo_actions(id,action){
    let props = this.props;
    if(action === "delete"){
      let all_data = props.data;
      console.log(all_data);
      const filteredData = all_data.filter(item => item.id !== id);
      console.log(filteredData);
      props.setData(filteredData);
    }

    else if(action=="status"){
      const updated_data = props.data.map(item => {
        if(item.id == id){
          return {...item,status:"Completed"};
        }
        return item;
      });
      props.setData(updated_data);
    }

    else{
      // console.log(props.data[0].todo);
      // console.log(date.value);
      let add_btn = document.getElementById(this.add_btn);
      console.log(add_btn.innerHTML);
      // document.getElementById(todo).value = props.data[0].todo;
      const eleToEdit = props.data.find(item => item.id===id);
      console.log(eleToEdit);
        if(eleToEdit){
          document.getElementById(this.todo).value = eleToEdit.todo;
          document.getElementById(this.datetime).value = eleToEdit.date;
          await this.setBtnClick(true);
          
        }
        setTimeout(()=>{
          let checkbtn = document.getElementById("checkbtn");
          console.log(checkbtn.innerHTML);
        checkbtn.onclick = ()=>{
          const updatedData = props.data.map(item => {
            if (item.id === id) {
              return { ...item, todo:document.getElementById(this.todo).value, date:document.getElementById(this.datetime).value };
            }
            return item;
          });
          props.setData(updatedData);
          console.log(updatedData);
          setTimeout(()=>this.setBtnClick(false),500);
          document.getElementById(this.todo).value = "";
          document.getElementById(this.datetime).value = "";
        }  
        },1000);
    }
  }

}

function HeroSection(props) {
  const setRootbg = props.setRootbg;
  const [btnClick,setBtnClick] = useState(false);
  const data_handler = new dataHandling(props,"todo","datetime","plus",setBtnClick);
  const [gridbg, setGridbg] = useState("bg-black");
  const [gridfg, setGridfg] = useState("text-white");
  const [btnbgColor1, setbtnbgColor1] = useState("bg-red-400");
  const [btnbgColor2, setbtnbgColor2] = useState("bg-zinc-800");
  const [btnfgColor1, setbtnfgColor1] = useState("text-white");
  const [btnfgColor2, setbtnfgColor2] = useState("text-white");
  const [tablebg, setTablebg] = useState("bg-slate-800");
  const [tableHeadbg, setTableHeadbg] = useState("bg-zinc-700");
  const [textSize, setTextSize] = useState(100);

  function blinkText(id){
    var element = document.getElementById(id);
    element.style.fontSize = "90%"
    element.onmouseup = () => {
      element.style.fontSize = "100%";
  };
  }

  tippy('#plus', {
    content: 'My tooltip!',
  });

  useEffect(() => {
    if (props.theme == "dark") {
      setRootbg("bg-zinc-800");
      setGridbg("bg-black");
      setGridfg("text-white");
      setbtnbgColor1("bg-red-");
      setbtnbgColor2("bg-zinc-");
      setbtnfgColor1("text-white");
      setbtnfgColor2("text-white");
      setTablebg("bg-slate-800");
      setTableHeadbg("bg-zinc-700");

    } else if (props.theme == "light") {
      setRootbg("bg-slate-200");
      setGridbg("bg-slate-100");
      setGridfg("text-black");
      setbtnbgColor1("bg-red-");
      setbtnbgColor2("bg-zinc-");
      setbtnfgColor1("text-white");
      setbtnfgColor2("text-white");
      setTablebg("bg-slate-300");
      setTableHeadbg("bg-slate-400");

    }
  }, [props.theme]);

  return (
    <div className="md:grid md:place-items-center h-full overflow-clip">
      <div
        className={`${gridbg} min-h-[50%] md:w-[70%] rounded-xl ${gridfg} p-5`}
      >
        <h1 className="text-center font-semibold text-xl mb-5">To-Do List</h1>

        <div className="gridlayout gap-2 my-6">
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Enter To-Do here..."
            className="text-slate-600 text-center rounded-md"
          />
          <input
            type="date"
            name="datetime"
            id="datetime"
            className="text-slate-600 text-center rounded-md min-h-16"
            
          />
          {btnClick? <button
            className={`grid place-items-center ${btnbgColor1}400 hover:${btnbgColor1}300 rounded-md `}
            id="checkbtn"
            onMouseDown={()=>{blinkText("checkbtn")}}
          >
            <FontAwesomeIcon icon={faCheck}/>
            
          </button>
          :
          <button
            className={`grid place-items-center ${btnbgColor1}400 hover:${btnbgColor1}300 rounded-md `}
            id="plus"
            onClick={()=>{ data_handler.add_data() }}
            onMouseDown={()=>{blinkText("plus")}}
          >
            <FontAwesomeIcon icon={faPlus}/>
            
          </button>}
        </div>

        <div className="btns flex justify-between">
          <button className={`${btnbgColor2}800 hover:${btnbgColor2}600 ${btnfgColor2} py-2 px-5 rounded-md text-[${textSize}]`}>
            Filter
          </button>
          <button 
            className={`${btnbgColor1}400 hover:${btnbgColor1}300 ${btnfgColor1} py-2 px-5 rounded-md text-[${textSize}]`}
            onClick={()=>{data_handler.delete_all();}} 
          >
            delete
          </button>
        </div>

        <table className={`my-5 ${tablebg} styled-table`}>
          <thead className={`text-left ${tableHeadbg}`}>
            <th>TO-DO</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </thead>

          <tbody>
          {props.data.map((item, index) => (
              <tr key={index}>
              <td className="text-wrap max-w-full">
                {item.todo}
              </td>
              <td className="max-w-full">{item.date}</td>
              <td className="">{item.status}</td>
              <td className="max-w-full flex flex-col md:flex-row">
                <button className="m-1 hover:text-blue-900" onClick={()=>{data_handler.todo_actions(item.id,"edit")}}>
                <FontAwesomeIcon icon={faPen} size="xs"/>

                </button>
                <button className="m-1 hover:text-blue-900" onClick={()=>{data_handler.todo_actions(item.id,"status")}}>
                <FontAwesomeIcon icon={faCheck} />

                </button>
                <button className="m-1 hover:text-blue-900" onClick={()=>{data_handler.todo_actions(item.id,"delete")}}>
                <FontAwesomeIcon icon={faTrash} />

                </button>
              </td>
            </tr>

            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HeroSection;
