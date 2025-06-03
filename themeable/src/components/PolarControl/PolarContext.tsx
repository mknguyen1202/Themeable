import React, { createContext, useContext, useState, ReactNode } from "react";

interface PolarContextProps {
    x: number;
    y: number;
    direction: string;
    setPolarData: (x: number, y: number, direction: string) => void;
}

const PolarContext = createContext<PolarContextProps | undefined>(undefined);


/**
 * 
 * @param param0 
 * @returns 
 */
export const PolarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [direction, setDirection] = useState("center");

    const setPolarData = (newX: number, newY: number, newDirection: string) => {
        setX(newX);
        setY(newY);
        setDirection(newDirection);
    };

    return (
        <PolarContext.Provider value={{ x, y, direction, setPolarData }}>
            {children}
        </PolarContext.Provider>
    );
};

export const usePolarContext = () => {
    const context = useContext(PolarContext);
    if (!context) throw new Error("usePolarContext must be used within a PolarProvider");
    return context;
};
