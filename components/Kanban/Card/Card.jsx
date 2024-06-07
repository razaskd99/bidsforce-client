import React, { useState } from "react";
import { VscChecklist } from "react-icons/vsc";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
// import { format } from 'date-fns';
import { Draggable } from "react-beautiful-dnd";
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetail from "../CardDetail/CardDetail";
import Link from "next/link";
const Card = (props) => {
	console.log("props", props)
	const [dropdown, setDropdown] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const progressPercentage = props.bid * 33 - 31;

	return (
		<Draggable key={props.id.toString()} draggableId={props.id.toString()} index={props.index} >
			{(provided) => (
				<div className="custom__card pt-2"
					onClick={() => {
						props.openCardDetail(props.id);
					}}
					//  onClick={() => { setModalShow(true); }}
					// onClick={() => { console.log("INSIDE") }}
					{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
					<div className="card__text p-3"><p>{props.title}</p>
						{/* <MoreHorizontal className="car__more" onClick={() => {setDropdown(true);}} />  */}
					</div>
					<div className="card__text p-3 flex flex-col gap-1 text-[#98A9BC] items-start">
						{/* <p className="text-black text-[13px]">{props.card.title}</p> */}
						<p>{props.card.company || "DRP Refinery Automation "}</p>
						<div className="flex justify-between w-full">
							<div className="flex gap-1 items-center">
								<img
									src={props.card.image || "https://images.unsplash.com/photo-1587397845856-e6cf49176c70?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "}
									alt="user" width={30} height={30}
									className="object-cover rounded-full w-8 h-8"
								/>
								<VscChecklist />
								<span className=" text-[11px]">5/8</span>
								<LuMessagesSquare className="ml-1" />
								<span className="text-[11px]">5/8</span>
							</div>
							<div className="flex items-center gap-1">
								<IoCalendarOutline />
								<span className="text-[11px]">
									{props.card.issueDate ? new Date(props.card.issueDate).toISOString().split('T')[0] : "20 Dec, 2023"}
								</span>
							</div>
						</div>
					</div>
					<div className="card__tags">
						{props.tags?.map((item, index) => (
							<Tag key={index} tagName={item.tagName} color={item.color} />
						))}
					</div>

					{props.card && props.card.task && (

						<div className="card__footer">
							{props.card.task.length !== 0 && (
								<div className="task">
									<CheckSquare />
									<span>
										{props.card.task.length !== 0
											? `${(props.card.task?.filter(
												(item) => item.completed === true
											)).length
											} / ${props.card.task.length}`
											: `${"0/0"}`}
									</span>
								</div>
							)}


						</div>)}

					{provided.placeholder}
					<div className="h-2 w-full bg-gray-300 rounded-full">
						<div className="h-full bg-green-500 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Card;
