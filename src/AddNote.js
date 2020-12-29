import React from 'react';
import NotefulContext from './NotefulContext';
import ValidationError from './ValidationError'
import API_ENDPOINT from './config'

export default class AddNote extends React.Component {
    
    static contextType = NotefulContext
    
    constructor(props){
        super(props)
        this.state = {
            name: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            folderId: {
                value: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                touched: false
            },
            error: ''
        }
    }
    
    updateName(name){
        this.setState({
            name: {
                value: name,
                touched: true
            }
        })
    }
    updateContent(content){
        this.setState({
            content: {
                value: content,
                touched: true
            }
        })
    }
    updateFolderId(folderId){
        this.setState({
            folderId: {
                value: folderId,
                touched: true
            }
        })
    }

    validateName(){
        const name = this.state.name.value.trim()
        if (name.length === 0){
            return 'Name is required'
        }

    }


    handleSubmit = (e) => {
        e.preventDefault()
        const note = {
            note_name: this.state.name.value ,
            content:this.state.content.value,
            folder_id: this.state.folderId.value,
            modified: new Date()
        } 
          
          
          fetch(`${API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
              'content-type': 'application/json',
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
              console.log(data)
              e.target['note-name'].value = ''
              e.target['note-content'].value = ''
              e.target['folder-select'].value = ''
              this.props.history.goBack()
              this.context.getData()
              
              
              
            })
            .catch(error => {
              this.setState({ error: error.message })
            })
        }
    
    render(){
        console.log(this.context.folders)
        return (
            <form className="add-note" onSubmit={this.handleSubmit}>
                <h2>Create a note</h2>
                <label htmlFor="note-name">Name</label>
                <input type="text" id="note-name" name="note-name" onChange={(e)=>this.updateName(e.target.value)} />
                {<ValidationError message={this.validateName()}/> && this.state.name.touched}
                <label htmlFor="note-content">Content</label>
                <textarea id="note-content" name="note-content" onChange={(e)=>this.updateContent(e.target.value)} />
                <label htmlFor="folder-select">Select Folder</label>
                <select id="folder-select" name="folder-select" onChange={(e)=>this.updateFolderId(e.target.value)} >
                    {this.context.folders.map(folder=>{
                        return (
                        <option key={folder.id} value={folder.id}>{folder.folder_name}</option>
                        )
                    })}
                </select>
                <button disabled={this.validateName()} type='submit'>Save</button>
                <p>{this.state.error}</p>
                
            </form>
        )
    }
}