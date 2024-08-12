import { useEffect, useState } from "react"

interface useFocus {
    element: HTMLElement | null,
}

export default function useFocus(props: useFocus) {
    const [focus, setFocus] = useState<boolean>();

    useEffect(() => {
        if (props.element != null) {
            const container = props.element.querySelector('.input-container') as HTMLDivElement;
            const label = props.element.querySelector('.input-label') as HTMLLabelElement;
            const input = props.element.querySelector('.input-field') as HTMLInputElement;

            if (focus) {
                container?.classList.add('focused');
                label?.classList.add('focused');
            } else {
                container?.classList.remove('focused');
                label?.classList.remove('focused');
    
                if (input?.value) {
                    label?.classList.add('hasValue');
                } else {
                    label?.classList.remove('hasValue');
                }
            }
        }

    }, [focus])

    return [focus, setFocus] as const
}