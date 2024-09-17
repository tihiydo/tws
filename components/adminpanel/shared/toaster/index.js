import { createContext, useContext, useState } from "react";

const ToasterContext = createContext(null)
const ToasterProvider = ({ children }) => {
	const [toast, setToast] = useState(null)
	return (
		<ToasterContext.Provider value={{toast, setToast}}>
			{ children }
		</ToasterContext.Provider>
	)
}

function useToasterContext() {
	const toaster = useContext(ToasterContext);
	if(!toaster) throw new Error("Toaster context must be used inside a toaster provider");
	else return toaster
}

function useToast() {
	const toaster = useToasterContext()
	const success = (title, subtitle) => {
		if(toaster.toast) return;
		toaster.setToast({
			type: "success",
			title, subtitle
		})
	}
	const error = (title, subtitle) => {
		if(toaster.toast) return;
		toaster.setToast({
			type: "error",
			title, subtitle
		})
	}

	return { success, error }
}

export { ToasterProvider, useToasterContext, useToast };
export * from "./Toaster";