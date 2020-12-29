import React from 'react'
import NotefulContext from './NotefulContext'
import API_ENDPOINT from './config'


export default class AddFolder extends React.Component {
    static contextType = NotefulContext
    

    constructor(props){
        super(props)
        this.state = {
            
            error:""
        }
    }
    

    handleSubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        
        const folder = {
          folder_name: e.target['folder-name'].value
        }
        
        this.setState({ error: null })
        console.log(process.env.API_ENDPOINT)
        fetch(`${API_ENDPOINT}/folders`, {
          method: 'POST',
          body: JSON.stringify(folder),
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
            e.target['folder-name'].value = ''
            this.props.history.push('/')

            this.context.getData()
            //this.context.addFolder(data)
            
            
          })
          .catch(error => {
            
            this.setState({ error: error.message })
            
            
            console.log(error)
          })
      }
    render(){
        return (
            <form className="add-note" onSubmit={this.handleSubmit}>
                <h2>Create a folder</h2>
                <label htmlFor="folder-name">Name</label>
                <input id="folder-name" name="folder-name"></input>
                {this.state.error}
                <button type="submit">Add Folder</button>
            </form>
        )
    }
}