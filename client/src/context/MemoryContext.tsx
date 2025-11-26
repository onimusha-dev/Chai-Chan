// import { createContext, useContext, useEffect, useState } from "react";
// import api from "@/api/api";

// interface MemoryContextType {
//     memory: any;
//     refreshMemory: () => Promise<void>;
//     saveMemory: (text: string) => Promise<void>;
// }

// const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

// export const MemoryProvider = ({ children }: { children: React.ReactNode }) => {
//     const [memory, setMemory] = useState(null);

//     const refreshMemory = async () => {
//         try {
//             const res = await api.get("memory");
//             setMemory(res.data);
            
//         } catch (err) {
//             console.error("Failed to load memory:", err);
//         }
//     };

//     const saveMemory = async (text: string) => {
//         try {
//             const res = await api.post("memory", { memory: text });
//             setMemory(res.data);
//             await refreshMemory();
//         } catch (err) {
//             console.error("Failed to save memory:", err);
//         }
//     };

//     useEffect(() => {
//         refreshMemory();
//     }, []);

//     return (
//         <MemoryContext.Provider value={{ memory, refreshMemory, saveMemory }}>
//             {children}
//         </MemoryContext.Provider>
//     );
// };

// export const useMemory = () => {
//     const ctx = useContext(MemoryContext);
//     if (!ctx) throw new Error("useMemory must be used within MemoryProvider");
//     return ctx;
// };
