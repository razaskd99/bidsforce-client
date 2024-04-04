import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";

export default function Board(props) {
  console.log(props)
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") setShow(false);
    });
    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.code === "Enter") setShow(false);
      });
    };
  });

  return (
    <div className="board rounded-t-lg ">
      <div className="board__top bg-[#26BADA] p-1 rounded-t-lg text-white">
        {show ? (
          <div>
            <input
              className="title__input"
              type={"text"}
              defaultValue={props.name}
              onChange={(e) => {
                props.setName(e.target.value, props.id);
              }}
            />
          </div>
        ) : (
          <div>
            <p
              onClick={() => {
                setShow(true);
              }}
              className="board__title"
            >
              {props?.name || "Name of Board"}
              <span className="total__cards ml-2">{props.card?.length}</span>
            </p>
          </div>
        )}
        <div
          onClick={() => {
            setDropdown(true);
          }}
          className="flex items-center gap-2"
        >
          <Editable name={"\u00A0"} btnName={""} placeholder={"Enter Card Title"} onSubmit={(value) => props.addCard(value, props.id)} className="hover:bg-[#26DADA] bg-white" />
          <MoreHorizontal />

          {/*{dropdown && (
            <Dropdown
              class="board__dropdown"
              onClose={() => {
                setDropdown(false);
              }}
            >
               <p onClick={() => props.removeBoard(props.id)}>Delete Board</p> 
            </Dropdown> 
            )}*/}
        </div>
      </div>
      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.card?.map((items, index) => (
              <Card
                bid={props.id}
                id={items.id}
                index={index}
                key={items.id}
                title={items.title}
                tags={items.tags}
                progress={items.progress} // Pass the progress prop here
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={items}
                status={props.name} // Pass the board status as status prop
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="board__footer">
        <Editable name={"Add Card"} btnName={"Add Card"} placeholder={"Enter Card Title"} onSubmit={(value) => props.addCard(value, props.id)} />
      </div>
    </div>
  );
}
