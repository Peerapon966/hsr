import { useEffect, useState } from "react";

type WindowObjectProps = {
  object: 'window'
  property: 'innerHeight' | 'innerWidth'
}

type AddEventListenerProps = {
  object: 'window'
  property: 'addEventListener'
  args: {
    event: string
    callback: Function
  }
}

type LocationObjectProps = {
  object: 'location'
  property: string
}

export type UseBOMObjectProps = WindowObjectProps | LocationObjectProps | AddEventListenerProps

export default function useBOMObject<T extends any[]>(props: UseBOMObjectProps[]): T {
  const [output, setOutput] = useState<T>(Array(props.length).fill(undefined) as T);

  useEffect(() => {
    const result = props.map((prop: UseBOMObjectProps) => {
      if (prop.object === 'window') {
        switch (prop.property) {
          case 'innerHeight':
            return window.innerHeight
          case 'innerWidth':
            return window.innerWidth
          case 'addEventListener':
            return window.addEventListener(prop.args.event as keyof WindowEventMap, prop.args.callback as EventListenerOrEventListenerObject);
          default:
            break;
        }
      } else if (prop.object === 'location') {
        return
      }

    }) as T;

    setOutput(result);
  }, []);

  return output
}