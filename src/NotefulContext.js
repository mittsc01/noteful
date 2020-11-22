import React from 'react'
const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
    getData: () => {}
})

export default NotefulContext