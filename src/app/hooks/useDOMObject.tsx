import { useEffect, useState } from "react";

type UseDOMObjectFromIdProps = {
  from: 'id'
  value: string
}

type UseDOMObjectFromClassNameProps = {
  from: 'classname'
  value: string
}

type UseDOMObjectFromQueryProps = {
  from: 'query'
  value: string
}

type GetAllClassnameElementsProps = UseDOMObjectFromClassNameProps & {
  getAll: true
}

type GetSpecificClassnameElementProps = UseDOMObjectFromClassNameProps & {
  getAll: false
  elementIdxToGet: number[]
}

export type UseDOMObjectProps = UseDOMObjectFromIdProps | GetAllClassnameElementsProps | GetSpecificClassnameElementProps | UseDOMObjectFromQueryProps

export default function useDOMObject<T extends any[]>(props: UseDOMObjectProps[]): T {
  const [output, setOutput] = useState<T>(Array(props.length).fill(undefined) as T);

  useEffect(() => {
    const result = props.map(prop => {
      if (prop.from === 'id') {
        return document.getElementById(prop.value)
      }

      if (prop.from === 'query') {
        return document.querySelector(prop.value)
      }

      if (prop.getAll) {
        return document.getElementsByClassName(prop.value)
      }

      return prop.elementIdxToGet.map(index => {
        return document.getElementsByClassName(prop.value)[index]
      })
    }) as T;

    setOutput(result);
  }, []);

  return output
}