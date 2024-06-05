import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";

export default function Board(props) {
  const { card, openCardDetail } = props;
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Enter") setShow(false);
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div className="board bg-[#EFF3F5]">
      <div className="board__top bg-[#26BADA] text-white p-2">
        {show ? (
          <div>
            <input className="title__input" type={"text"}    defaultValue={props.name}
              onChange={(e) => { props.setName(e.target.value, props.id); }} />
          </div>
        ) : (
          <div>
            <p onClick={() => { setShow(true); }} className="board__title">
              {props?.name || "Name of Board"}
              {/* <span className="text-white ml-1 font-normal">{props.card?.length}</span> */}
            </p>
          </div>
        )}
        <div className="flex gap-1 items-center">
          <Editable
            name={""}
            btnName={"Add Card"}
            placeholder={"Enter Card Title"}
            onSubmit={(value) => props.addCard(value, props.id)}
          />
          <MoreHorizontal onClick={() => { setDropdown(true); }} />

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
            className="board__cards h-[100vh]"
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
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={items}
                // onClick={() => props.openCardDetail(c.id)} 
                openCardDetail={openCardDetail} // Pass openCardDetail to Card

              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="board__footer">
        {/* <Editable
          name={"Add Card"}
          btnName={"Add Card"}
          placeholder={"Enter Card Title"}
          onSubmit={(value) => props.addCard(value, props.id)}
        /> */}
      </div>
    </div>
  );
}
