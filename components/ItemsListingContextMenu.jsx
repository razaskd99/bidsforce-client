import React, { useState, useEffect, useRef } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';




function ItemsListingContextMenu({ item, hideContextMenu, updateItem, deleteItem }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
  
    const handleContextMenu = (event) => {
      event.preventDefault();
      setShowMenu(true);
      hideContextMenu();
    };
  
    const handleDelete = () => {
      deleteItem(item.id);
      setShowMenu(false); // Hide context menu after action
    };
  
    const handleUpdate = () => {
      updateItem(item.id);
      setShowMenu(false); // Hide context menu after action
    };
  
    return (
      <div ref={menuRef} className='relative'>       
        < BsThreeDots
            className='flex-[1/2] mr-4 cursor-pointer text-gray-500' 
            onClick={handleContextMenu} 
        />
        {showMenu && (
          <ContextMenu onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </div>
    );
  }

  function ContextMenu({ onDelete, onUpdate }) {
    return (
      <div className="absolute bg-white border border-gray-200 shadow-md py-2 px-4 absolute right-0 z-20">
        <button onClick={onDelete} className="block w-full text-left py-2 hover:bg-gray-100">Delete</button>
        <button onClick={onUpdate} className="block w-full text-left py-2 hover:bg-gray-100">Update</button>
      </div>
    );
  }


/*
  function ItemsListingContextMenu({ items }) {
    const [activeItem, setActiveItem] = useState(null);
  
    const hideContextMenu = () => {
      setActiveItem(true);
    };

    const updateContextMenu = itemID => {
        console.log('update',itemID)
    }

    const deleteContextMenu = itemID => {
        console.log('delete',itemID)
    }
  
    return (
      <div>
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            deleteItem={deleteContextMenu}
            updateItem={updateContextMenu}
            hideContextMenu={hideContextMenu}
            isActive={index === activeItem}
            onClick={() => setActiveItem(index)}
          />
        ))}
      </div>
    );
  }
*/
export default ItemsListingContextMenu;
