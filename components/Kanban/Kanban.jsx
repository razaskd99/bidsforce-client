'use client'
import { useEffect, useState } from "react";
import Board from "./Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "./bootstrap.css";
import CardDetail from "./CardDetail/CardDetail";
function Kanban() {
    const [selectedCard, setSelectedCard] = useState();
    const [selectedCardData, setSelectedCardData] = useState();
    const [data, setData] = useState([
        { id: 1, boardName: "To Do", card: [] },
        { id: 2, boardName: "In Progress", card: [] },
        { id: 3, boardName: "In Review", card: [] },
        { id: 4, boardName: "Complete", card: [] },
    ]);
    const openCardDetail = (cardId) => {
        setSelectedCard(cardId);
        const cardData = data
            .flatMap((board) => board.card)
            .find((card) => card.id === cardId);
        setSelectedCardData(cardData);
    };
    const closeCardDetail = () => {
        setSelectedCard(null);
    };
    // Function to add data from card detail into data State
    const updateCardData = (updatedCard) => {
        setData((prevData) => {
            return prevData.map((board) => {
                return {
                    ...board,
                    card: board.card.map((card) =>
                        card.id === updatedCard.id ? updatedCard : card
                    ),
                };
            });
        });
    };
    const selectedBoardId = 1;
    const updateCardInBoard = (boardId, newCard) => {
        setData((prevData) =>
            prevData.map((board) =>
                board.id === boardId
                    ? { ...board, card: [...board.card, newCard] }
                    : board
            )
        );
    };
    const addCard = (card, boardId) => {
        const index = data.findIndex((item) => item.id === boardId);
        if (index !== -1) {
            const updatedData = [...data];
            updatedData[index].card.push({
                id: uuidv4(),
                ...card,
            });
            setData(updatedData);
        }
    };
    const removeCard = (boardId, cardId) => {
        const index = data.findIndex((item) => item.id === boardId);
        const tempData = [...data];
        const cardIndex = data[index].card.findIndex((item) => item.id === cardId);
        tempData[index].card.splice(cardIndex, 1);
        setData(tempData);
    };
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        const tempData = [...data];
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
    };
    return (
        <div className="app-outer">
            {selectedCard ? (
                <CardDetail 
                onClose={closeCardDetail}
                 card={selectedCardData}
                 data={data}
                 setData={setData}
                 />
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="app_outer">
                        <div className="app_boards flex items-center justify-between w-full">
                            {data.map((item) => (
                                <Board
                                    key={item.id}
                                    id={item.id}
                                    name={item.boardName}
                                    card={item.card}
                                    addCard={addCard}
                                    removeCard={removeCard}
                                    updateCardData={updateCardData}
                                    openCardDetail={openCardDetail}
                                />
                            ))}
                        </div>
                    </div>
                </DragDropContext>
            )}
        </div>
    );
}

export default Kanban;