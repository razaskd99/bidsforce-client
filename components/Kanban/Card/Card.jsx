import React, { useState } from "react";
import { VscChecklist } from "react-icons/vsc";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { Draggable } from "react-beautiful-dnd";
import { CheckSquare, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Tag from "../Tags/Tag";
import "./Card.css";

const Card = (props) => {
	const { id, title, card, bid, index, tags, openCardDetail, removeCard } = props;
	const [dropdown, setDropdown] = useState(false);
	const progressPercentage = bid * 33 - 31;

	const handleRemoveTask = () => {
		removeCard(bid, id);
	};
	const totalTasks = card?.task?.length || 0;
	const completedTasks = card?.task?.filter(item => item.completed).length || 0;
	// let card.type = 'activity'
	console.log(card)

	return (
		<Draggable key={id.toString()} draggableId={id.toString()} index={index}>
			{(provided) => (
				<div
					className="custom__card  relative"
					onClick={() => openCardDetail(id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div className={`text-xs w-max px-5 py-0.5 ml-auto ${card.type === 'Activity' ? 'bg-orange-200 text-orange-500' : card.type === 'Technical Deliverable' ? 'bg-blue-200 text-blue-500' : card.type === 'Commercial Deliverable' ? 'bg-pink-200 text-pink-500' : ''}`}>
						{card.type}</div>
					<div className="card__text px-3">
						<p>{title}</p>
						<div className="flex text-[#98A9BC] items-center justify-between">
							<p>{card.company || "DRP Refinery Automation"}</p>
							<div className="">
								<MoreHorizontal className="ml-auto" onClick={(e) => { e.stopPropagation(); setDropdown(true); }} />
								{dropdown && (
									<Dropdown className="board__dropdown" onClose={() => setDropdown(false)} >
										<div
											className="dropdown-option text-black p-2 bg-white border border-b-1"
											onClick={(e) => { e.stopPropagation(); handleRemoveTask(); setDropdown(false); }} >
											Remove task
										</div>
									</Dropdown>
								)}
							</div>
						</div>

					</div>
					<div className="card__text p-3 flex flex-col gap-1 text-[#98A9BC] items-start">
						<div className="flex justify-between w-full">
							<div className="flex gap-1 items-center">
								<img
									src={
										card.image ||
										"https://images.unsplash.com/photo-1587397845856-e6cf49176c70?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									}
									alt="user"
									width={16}
									height={16}
									className="object-cover rounded-full w-8 h-8"
								/>
								<VscChecklist />
								<span className="text-[11px]">{completedTasks}/{totalTasks}</span>
								{/* <LuMessagesSquare className="ml-1" />
                <span className="text-[11px]">5/8</span> */}
							</div>
							<div className="flex items-center gap-1">
								<IoCalendarOutline />
								<span className="text-[11px]">
									{card.issueDate
										? new Date(card.issueDate).toISOString().split("T")[0]
										: "20 Dec, 2023"}
								</span>
							</div>
						</div>
					</div>
					<div className="card__tags">
						{tags?.map((item, index) => (
							<Tag key={index} tagName={item.tagName} color={item.color} />
						))}
					</div>

					{/* {card && card.task && (
						<div className="card__footer">
							{card.task.length !== 0 && (
								<div className="task">
									<CheckSquare />
									<span>
										{card.task.length !== 0
											? `${card.task.filter((item) => item.completed).length} / ${card.task.length}`
											: "0/0"}
									</span>
								</div>
							)}
						</div>
					)} */}

					{provided.placeholder}
					<div className="h-2 w-full bg-gray-300 rounded-full">
						<div
							className={`h-full rounded-full 
                ${progressPercentage < 25 ? "bg-red-600" :
									progressPercentage < 50 ? "bg-orange-500" :
										progressPercentage < 75 ? "bg-green-300" :
											"bg-green-500"} `}
							style={{ width: `${progressPercentage}%` }}
						></div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Card;
