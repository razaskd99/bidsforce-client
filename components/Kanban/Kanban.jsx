'use client'
import React, { useEffect, useState } from "react";
import Board from "./Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "./bootstrap.css";

function Kanban() {
  const [data, setData] = useState(() => {
  const savedData = localStorage?.getItem("kanban-board");
  return savedData
      ? JSON.parse(savedData)
      : [
          { id: 1, boardName: "To Do", card: [] },
          { id: 2, boardName: "In Progress", card: [] },
          { id: 3, boardName: "In Review", card: [] },
          { id: 4, boardName: "Complete", card: [] },
        ];
  });

  useEffect(() => {
    //localStorage?.setItem("kanban-board", JSON.stringify(data));
  }, [data]);

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
      progress: 0, // Initialize progress to 0
    });
    setData(tempData);
  };

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );

    const [movedCard] = tempData[sourceBoardIdx].card.splice(source.index, 1);
    tempData[destinationBoardIdx].card.splice(destination.index, 0, movedCard);

    // Update progress when card is moved
    updateCardProgress(tempData[destinationBoardIdx].card);

    setData(tempData);
  };

  const updateCardProgress = (cards) => {
    cards.forEach((card) => {
      const completedTasks = card.task.filter((task) => task.completed).length;
      const totalTasks = card.task.length;
      card.progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    dragCardInBoard(source, destination);
  };
  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };
  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };
  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    console.log(tempBoards);
    setData(tempBoards);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app_outer">
        <div className="app_boards flex justify-evenly">
          {data.map((item) => (
            <Board
              key={item.id}
              id={item.id}
              name={item.boardName}
              card={item.card}
              setName={setName}
              addCard={addCard}
              updateCardProgress={updateCardProgress} 
              removeCard={removeCard}
              removeBoard={removeBoard}
              updateCard={updateCard}
              // Other props
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default Kanban;
