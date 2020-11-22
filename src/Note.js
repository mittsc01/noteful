import React from 'react';
import {Link} from 'react-router-dom';
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types'

function deleteNoteRequest(noteId,cb, history){
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': `application/json`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        cb(noteId)
        history.push('/')
      })
      .catch(error => {
        console.error(error)
      })
  
  }

export default function Note(props){
    return (
        <NotefulContext.Consumer>
            {context=>{
                return (
                    <div className='note'>
                        <Link to={`/note/`+props.note.id}>
                        <h2>{props.note.name}</h2>
                        </Link>
                        <button onClick={()=>deleteNoteRequest(props.note.id,context.deleteNote,props.history)} className='delete'>Delete</button>
                        
                        
                        <p>{props.note.modified}</p>
                    </div>
                )
            }
            }
            
        </NotefulContext.Consumer>
        
    )
}

Note.defaultProps = {
    history: {
        push: () => {}
    }
}
Note.propTypes = {
  note: PropTypes.object
}
