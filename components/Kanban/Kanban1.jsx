'use client'
import { useEffect, useState } from "react";
import Board from "./Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
// import "./bootstrap.css";
// import data from './data'
// import Editable from "./components/Editable/Editable";
// import useLocalStorage from "use-local-storage";
function Home() {
  const [data, setData] = useState([
    {id: 1,boardName: "To Do",card: []},
    {id: 2,boardName: "In Progress",card: []},
    {id: 3,boardName: "In Review",card: []},
    {id: 4,boardName: "Complete",card: []},
  ]);


/*   const defaultDark = window.matchMedia(
    "(prefers-colors-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  ); */

 /*  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }; */

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
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
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);

    return tempData;
  };

  // const dragCardInSameBoard = (source, destination) => {
  //   let tempData = Array.from(data);
  //   console.log("Data", tempData);
  //   const index = tempData.findIndex(
  //     (item) => item.id.toString() === source.droppableId
  //   );
  //   console.log(tempData[index], index);
  //   let [removedCard] = tempData[index].card.splice(source.index, 1);
  //   tempData[index].card.splice(destination.index, 0, removedCard);
  //   setData(tempData);
  // };

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
    });
    setData(tempData);
  };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(source, destination));
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

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(data));
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="app_outer min-h-[100vh] h-full">
          <div className="app_boards flex justify-between">
            {data.map((item) => (
              <Board
                key={item.id}
                id={item.id}
                name={item.boardName}
                card={item.card}
                setName={setName}
                addCard={addCard}
                removeCard={removeCard}
                removeBoard={removeBoard}
                updateCard={updateCard}
              />
            ))}
          </div>
        </div>
    </DragDropContext>
  );
}

export default Home;
