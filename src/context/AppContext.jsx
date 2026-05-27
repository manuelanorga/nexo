import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [selectedOCId, setSelectedOCId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [openNuevoSKU, setOpenNuevoSKU] = useState(false)

  return (
    <AppContext.Provider value={{
      selectedOCId, setSelectedOCId,
      searchQuery, setSearchQuery,
      openNuevoSKU, setOpenNuevoSKU,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
