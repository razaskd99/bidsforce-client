'use client'
import { createContext, useContext, useState } from "react"

export const userContext = createContext();

export const userProvider = ({ children }) => {
    const [role, setRole] = useState("sales");

    <userContextProvider value={{ role }}>
        {children}
    </userContextProvider>
}     