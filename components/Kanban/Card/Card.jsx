import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CheckSquare, MoreHorizontal } from "react-feather";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";
import Image from "next/image";
import { VscChecklist } from "react-icons/vsc";
import { TbMessages } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";

const Card = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const calculateProgress = (status) => {
    switch (status) {
      case "To Do":
        console.log("Inside TODO")
        return 0;
      case "In Progress":
        console.log("PROG")

        return 25;
      case "In Review":
        console.log("Inside Rev")

        return 50;
      case "Complete":
        console.log("Inside Glass")
        return 100;
      default:
        return 0;
    }
  };

  const progress = calculateProgress(props.status);

  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={setModalShow}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          <div
            className="custom__card p-3 overflow-hidden rounded-lg relative" onClick={() => { setModalShow(true); }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
            <div className="card__text capitalize">
              <p>{props.title}</p>
              <MoreHorizontal className="car__more" />
            </div>
            <div className="company text-[#98A9BC]">DRP Refinery Automation </div>
            <div className="flex items-center justify-between text-[#98A9BC]  text-sm mt-3 m  mb-6  ">
              <div className="flex items-center gap-1">
                <Image src="/man.jpeg" alt="user" width={20} height={20} className='rounded-full mr-2' />
                <VscChecklist />
                <p>3/5</p>
                <TbMessages />
                <p>8</p>
              </div>
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt />
                <p>02/03/2024</p>
              </div>
            </div>
            <div className="card__tags">
              {props.tags?.map((item, index) => (
                <Tag key={index} tagName={item.tagName} color={item.color} />
              ))}
            </div>

            <div className="card__footer">
              <div className="task-progress">
                <CheckSquare />
                <span>
                  {props.card.task.length !== 0
                    ? `${props.card.task.filter((item) => item.completed === true)
                      .length
                    } / ${props.card.task.length}`
                    : `${"0/0"}`}
                </span>
              </div>
            </div>
            <div className="progress-bar h-2 bg-slate-300 w-full absolute left-0 right-0 bottom-0" style={{ with: "100%" }}>
              {console.log({ progress })}
              <div className="progress h-2" style={{ width: `${progress+10}%`, backgroundColor: progress < 30 ? "#FE4D97" : "#6DD230" }}></div>
            </div>
            {provided.placeholder}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
