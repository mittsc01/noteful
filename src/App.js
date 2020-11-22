import React from 'react';
import NoteList from './NoteList'
import SideBar from './SideBar'
import './App.css'
import { Route, Link } from 'react-router-dom'
import NoteSideBar from './NoteSideBar'
import NoteMain from './NoteMain'
import NotefulContext from './NotefulContext'
import BackBar from './BackBar'
import AddFolder from './AddFolder'
import AddNote from './AddNote'
import NavError from './NavError'
import MainError from './MainError'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      folders: []

    }
  }

  componentDidMount(){
    this.getData()
  }

  

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note=>note.id!==noteId)
    this.setState({notes:newNotes})
  }

  addFolder = newFolder => {
    const newFolders = [...this.state.folders,newFolder]
    this.setState({folders:newFolders})
  }

  getData = () => { 
    const urlFolders = 'http://localhost:9090/folders'
    const urlNotes = 'http://localhost:9090/notes'
    Promise.all([
      fetch(urlFolders),
      fetch(urlNotes)
    ])
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    })
    .then(data=>{
      this.setState({
        folders: data[0],
        notes: data[1]
      })
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      getData: this.getData
    }

    return (
      <div className='container'>
        <Link to="/">
          <h1>Noteful</h1>
        </Link>

        <NotefulContext.Provider value={contextValue}>
          <div className='noteful'>
            <nav>
              <NavError>
                <Route path='/' exact component={SideBar} />
                <Route path='/folder/:folderId' component={SideBar} />
                <Route path='/note/:noteId' component={NoteSideBar} />
                <Route path='/add-folder' component={BackBar} />
                <Route path='/add-note' component={BackBar} />

              </NavError>
              
            </nav>

            <main className='App'>
              <MainError>
                <Route exact path='/' component={NoteList} />
                <Route path='/folder/:folderId' component={NoteList} />
                <Route path='/note/:noteId' component={NoteMain} />
                <Route path='/add-folder' component={AddFolder} />
                <Route path='/add-note' component={AddNote} />
                
              </MainError>
              
             </main>
          </div>
        </NotefulContext.Provider>

      </div>
    );

  }

}

export default App;
