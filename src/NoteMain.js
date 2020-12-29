import React from 'react'
import Note from './Note'
import NotefulContext from './NotefulContext'


export default function NoteMain(props){
    return (
        <NotefulContext.Consumer>
            {context=>{
                const note = context.notes.find(note => note.id==props.match.params.noteId) || {}    
                return (
                    <div className="note-main">
                        <Note note={note} history={props.history} />
                        <p>{note.content}</p>
                        
                    </div>
                )
            }


            }
            

        </NotefulContext.Consumer>
        
    )
}