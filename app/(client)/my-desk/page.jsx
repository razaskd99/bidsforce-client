'use client'


import Alert from "@/components/Alert";
import { useState } from "react";


const page = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h1>My desk</h1>
            <div>
                <button onClick={handleOpen} className="bg-[#26BADA]">Show Alert</button>
                <Alert open={open} onClose={handleClose} message="This is a warning message." />
            </div>
        </div>
    )
}

export default page