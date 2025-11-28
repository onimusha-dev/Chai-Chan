import ollama from 'ollama';
import { Memory } from '../models/memory.model';
import { SYSTEM_SUMMERISER_PROMPT } from '../utils/constants';

//  this is storing the memory of the user
export const createOllamaMemory = async (
    rowMemory: string,
    userId: string = '6923377f389a4f64febf04b5',
) => {
    try {
        const isMemoryExits = await Memory.findOne({ user: userId });

        const response = await ollama.chat({
            model: 'gemma3:270m',
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_SUMMERISER_PROMPT,
                    
                },
                { role: 'user', content: `${rowMemory}` },
            ], 
            think: false
        });
        if (!response) throw new Error('error creating memory.   service');
        console.log(response);
        console.log(
            ' ====================++++++++++++++++++++++++++++++++=========================',
        ); 
        /**
         * if memory exists then replace no need to create a new one
         */
        if (isMemoryExits) {
            const newUpdatedMemory = await Memory.findOneAndUpdate(
                { userId },
                {
                    $set: {
                        rawMemory: response.message.content,
                        summarisedMemory: response.message.content,
                    },
                },
                { new: true },
            ).lean();
            if (!newUpdatedMemory) throw new Error('error creating memeory.');
            console.log(newUpdatedMemory.summarisedMemory);
            return newUpdatedMemory.rawMemory;
        } else {
            /**
             * if memory doesnot exists then create and send back to user
             */
            const newMemory = new Memory({
                userId,
                rawMemory: rowMemory,
                summarisedMemory: response.message.content,
            });

            const newCreatedMemory = await newMemory.save();
            if (!newMemory) throw new Error('error creating memory!');

            console.log(newMemory);
            console.log(response);
            console.log(
                ' ====================++++++++++++++++++++++++++++++++=========================',
            );
            return newCreatedMemory.rawMemory;
        }
    } catch (err) {
        console.log(err);
    }
};

// this is for getting the memory of the user
export const getOllamaMemory = async (userId: string) => {
    try {
        const memory = await Memory.findOne({ userId }).lean();

        if (!memory) return '';

        return memory ? memory.rawMemory : '';
    } catch (err) {
        console.log(err);
    }
};
