import React from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'

export default function SideBar(props){
    
    
    return (
        <NotefulContext.Consumer>
            {context=>{
                const folders = context.folders.map(folder => {
                    return (
                        <Link to={'/folder/'+folder.id} key={folder.id+'-folder'}>
                            <h3 id={folder.id}>{folder.name}</h3>
                        </Link>
                    )
                });

                return (
                    <div>
                        <ul>
                          {folders}
                        </ul>
                        <button onClick={()=>props.history.push('/add-folder')}>Add Folder</button>
                    </div>
                    
                )
            }}
            
        </NotefulContext.Consumer>
        
    )
}