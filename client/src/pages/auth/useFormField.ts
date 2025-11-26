import { useState } from "react";

export function useFormField<T>(initial: T) {
    const [value, setValue] = useState<T>(initial);

    function update(newValue: T) {
        setValue(newValue);
    }

    return { value, update };
}
