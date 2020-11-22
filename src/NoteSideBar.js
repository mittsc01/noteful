import React from 'react'
import NotefulContext from './NotefulContext'
import {Link} from 'react-router-dom'



export default function NoteSideBar(props){
    return (
        <NotefulContext.Consumer>
            {context=>{
                const note = context.notes.find(note=>note.id===props.match.params.noteId) || {}
                
                const currentFolder= context.folders.find(folder=>folder.id===note.folderId) || {}
                return(
                    <nav className='note-sidebar'>
                        <Link to={'/folder/'+currentFolder.id}>
                            <h2>{currentFolder.name}</h2>
                        </Link>
                        
                        
                    </nav>
                )
            }}
            
        </NotefulContext.Consumer>
        
    )
}