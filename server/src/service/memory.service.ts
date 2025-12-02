import ollama from 'ollama';
import { Memory } from '../models/memory.model';
import { SYSTEM_SUMMERISER_PROMPT } from '../utils/constants';

//  this is storing the memory of the user
export const createOllamaMemory = async (
    userId: string,
    userName: string,
    modelName: string,
    rowMemory: string,
    modelPersona: string
) => {
    try {
        const isMemoryExits = await Memory.findOne({ userId });
        /**
         * if memory exists then replace no need to create a new one
         */
        if (isMemoryExits) {
            const newUpdatedMemory = await Memory.findOneAndUpdate(
                { userId },
                {
                    $set: {},
                },
                { new: true },
            ).lean();
            if (!newUpdatedMemory) throw new Error('error creating memeory.');
            console.log(newUpdatedMemory.vectorMemory);
            return newUpdatedMemory.rawMemory;
        }/**
             * if memory doesnot exists then create and send back to user
             */
        else {
            const newMemory = new Memory({
                userId,
                rawMemory: rowMemory,
            });

            const newCreatedMemory = await newMemory.save();
            if (!newMemory) throw new Error('error creating memory!');

            console.log(newMemory);
            console.log(
                ' ====================++++++++++++++++++++++++++++++++=========================',
            );
            return ''
        }
    } catch (err) {
        console.log(err);
    }
};

// this is for getting the memory of the user
export const getOllamaMemory = async (userId: string) => {
    try {
        const memory = await Memory.findOne({ userId }).lean();

        if (!memory) throw new Error('memory didnot found');

        return memory;
    } catch (err) {
        console.log(err);
    }
};
