import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip } from "@mui/material";
import swal from "sweetalert";

import "./Todo.css";

const getLocalStorageItems = () => {
  let localList = localStorage.getItem("List");
  if (localList) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [addTodo, setAddTodo] = useState("");
  const [list, setList] = useState(getLocalStorageItems());
  const [toogle, setToogle] = useState(true);
  const [editItems, setEditItems] = useState(null);
  //function to add the items

  const AddItems = () => {
    if (!addTodo) {
      swal({
        text: "Please Add Item",
        icon: "warning",
        button: true,
      });
    } else if (addTodo && !toogle) {
      setList(
        list.map((elem) => {
          if (elem.id === editItems) {
            return { ...elem, name: addTodo };
          }
          return elem;
        })
      );
      setToogle(true);
      setAddTodo(" ");
      setEditItems(null);
    } else {
      //to updata the list we have to assign a new id for particular item
      const newEntry = { id: new Date().getTime().toString(), name: addTodo };
      setList([...list, newEntry]);
      setAddTodo("");
    }
  };

  //function to delete the items

  const DeleteItem = (index) => {
    //array.filter return a new array thats why always store it in new variable
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((DeleteItem) => {
      if (DeleteItem) {
        const updatedItems = list.filter((val) => {
          return index !== val.id;
        });
        setList(updatedItems);
      }
    });
  };

  //function to edit the items

  const EditItem = (para) => {
    let newEditItem = list.find((currElem) => {
      return currElem.id === para;
    });
    setToogle(true);
    setAddTodo(newEditItem.name);
    setEditItems(para);
  };

  //setting items in local storage
  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(list));
  }, [list]);
  return (
    <div>
      <div className="main_heading">
        <h1>Todo List</h1>
      </div>
      <div className="main_div">
        <div className="add_todo">
          <input
            type="text"
            placeholder="Add Items"
            value={addTodo}
            onChange={(e) => setAddTodo(e.target.value)}
          />
          {toogle ? (
            <AddIcon style={{ background: "green" }} onClick={AddItems} />
          ) : (
            <Tooltip title="Update Item" placement="top">
              <BorderColorIcon
                style={{ backgroundColor: "yellow", color: "grey" }}
                onClick={AddItems}
              />
            </Tooltip>
          )}
        </div>
        {list.map((elem) => {
          return (
            <div className="todo_list" key={elem.id}>
              <li>{elem.name}</li>
              <div className="todo_icon add_todo">
                <Tooltip title="Delete Item" placement="top">
                  <DeleteIcon
                    style={{ background: "red" }}
                    onClick={() => DeleteItem(elem.id)}
                  />
                </Tooltip>
                <Tooltip title="Edit Item" placement="top">
                  <BorderColorIcon
                    style={{ backgroundColor: "yellow", color: "grey" }}
                    onClick={() => EditItem(elem.id)}
                  />
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
