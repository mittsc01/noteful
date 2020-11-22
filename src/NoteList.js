import React from 'react'
import Note from './Note'
import NotefulContext from './NotefulContext'

export default function NoteList(props){
    
    
    return (
        
            <NotefulContext.Consumer>
                {(context)=>{
                    //filter notes by folder if folder is selected
                    const folderNotes = context.notes.filter(note=>note.folderId===props.match.params.folderId || !props.match.params.folderId);
                    const notes = folderNotes.map((note,i)=>(
                    <div key={i}>
                        <Note note={note} />
                        
                    </div>));
                    
                    return (
                        <div>
                            <ul className="note-list">
                                {notes}
                                
                            </ul>
                            <button type='button' onClick={()=>props.history.push('/add-note')}>Add Note</button>
                        </div>
                        
                    )
                    
                }
                    
                    
                

                }
            </NotefulContext.Consumer>
            
            

        
    )
}