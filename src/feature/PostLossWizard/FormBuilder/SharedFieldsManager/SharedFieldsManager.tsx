import { createContext, useContext, type ReactNode } from "react";
import { useSharedFieldsSetup, type SharedFieldsContextType } from "./hooks/useSharedFieldsSetup";

const SharedFieldsProvider = createContext<SharedFieldsContextType | undefined>(undefined)

export const useSharedFieldsManager = () => useContext(SharedFieldsProvider)

type SharedFieldsManagerProps = {
  fields: Record<string, string>;
  children: ReactNode
}

export const SharedFieldsManager = ({fields, children}: SharedFieldsManagerProps) => {
  const {sharedFields, publishSharedFields} = useSharedFieldsSetup(fields)

  return (
    <SharedFieldsProvider value={{sharedFields, publishSharedFields}}>
      {children}
    </SharedFieldsProvider>
  )
}
