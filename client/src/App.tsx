import React from 'react'
//import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'
//import styled from 'styled-components'
//import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import CreateProject from './components/Project/CreateProject'
import ProjectList from './components/Project/ProjectList'
import Project from './components/Project/Project'
import EditProject from './components/Project/EditProject'
//import EditList from './components/List/EditList'
import CreateList from './components/Project/List/CreateList'
import CreateNote from './components/Project/List/CreateNote'

class App extends React.Component {
  state = {
    projects: [],
    project: null,
    lists: [],
    list: null,
    notes: [],
    note: null,
    projectLists: [],
    projectNotes: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/projects')
      .then((response) => {
        this.setState({
          projects: response.data
        })
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      })

    axios.get('http://localhost:5000/api/lists')
      .then((response) => {
        this.setState({
          lists: response.data
        })
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      })

    axios.get('http://localhost:5000/api/notes')
      .then((response) => {
        this.setState({
          notes: response.data
        })
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      }) 
  }

  //projectLists = lists.filter(list => list.projectName === project.name).sort(compare)

  onProjectCreated = project => {
    const newProjects = [...this.state.projects, project]

    this.setState({
      projects: newProjects
    })
  }

  onListCreated = list => {
    const newLists = [...this.state.lists, list]
    const projectLists = [...this.state.projectLists, list]
    this.setState({
      lists: newLists,
      projectLists: projectLists
    })
  }

  onNoteCreated = note => {
    const newNotes = [...this.state.notes, note]
    const projectNotes = [...this.state.projectNotes, note]

    this.setState({
      notes: newNotes,
      projectNotes: projectNotes
    })
  }

  onListUpdated = list => {
    console.log('updated list: ', list)
    const newLists = [...this.state.lists]
    const index = newLists.findIndex(l => l.id === list.id)

    newLists[index] = list

    const projName = list.projectName
    
    const projectLists = newLists.filter(list => list.projectName === projName)

    this.setState({
      lists: newLists,
      projectLists: projectLists
    })
  }


  onProjectUpdated = project => {
    console.log('updated project: ', project)
    const newProjects = [...this.state.projects]
    const index = newProjects.findIndex(p => p.id === project.id)

    newProjects[index] = project
    
    this.setState({
      projects: newProjects,
      project: project
    })
  }

  viewProject = project => {
    console.log(`view ${project.name}`);

    const { lists, notes } = this.state

    const projectLists = lists.filter(list => list.projectName === project.name)
    const projectNotes = notes.filter(note => note.projectName === project.name)

    this.setState ({
      project: project,
      projectLists: projectLists,
      projectNotes: projectNotes
    })
  }

  deleteProject = project => {
    axios
      .delete(`http://localhost:5000/api/projects/${project.id}`)
      .then(response => {
        const newProjects = this.state.projects.filter(p => p.id !== project.id)
        this.setState({
          posts: [...newProjects]
        })
      })

      .catch(error => {
        console.error(`Error deleting project: ${error}`)
      })
  }

  editProject = project => {
    this.setState({
      project: project
    })
  }

  createNewNote = list => {
    this.setState({
      list: list
    })
  }

  updateListOrder = (project, listString) => {

    const update = async () => {

          const newProject = {
              id: project.id,
              name: project.name,
              lists: listString
          }

          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }

              //Update the list
              const body = JSON.stringify(newProject)
              const res = await axios.put(
                  'http://localhost:5000/api/projects',
                  body,
                  config
              )

              //Call the handler and redirect
              this.onProjectUpdated(res.data)
          } catch (error) {
              console.error(`Error creating lists: ${error.response.data}`)
          }
      }

    update()  
  }

  updateNoteOrder = (list, notesString) => {

    const update = async () => {

      const newList = {
          id: list.id,
          title: list.title,
          projectName: list.projectName,
          notes: notesString
      }

      try {
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }

          //Update the list
          const body = JSON.stringify(newList)
          const res = await axios.put(
              'http://localhost:5000/api/lists',
              body,
              config
          )

          //Call the handler and redirect
          this.onListUpdated(res.data)
      } catch (error) {
          console.error(`Error creating lists: ${error.response.data}`)
      }
    }

    update()  
  }

  updateNoteOrderTwo = (homeList, foreignList, homeNotesString, foreignNotesString) => {

    const update = async () => {

      const newHomeList = {
          id: homeList.id,
          title: homeList.title,
          projectName: homeList.projectName,
          notes: homeNotesString
      }

      const newForeignList = {
        id: foreignList.id,
        title: foreignList.title,
        projectName: foreignList.projectName,
        notes: foreignNotesString
    }

      try {
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }

          //Update the list
          const homeBody = JSON.stringify(newHomeList)
          let res = await axios.put(
              'http://localhost:5000/api/lists',
              homeBody,
              config
          )

          const newHome = res.data
          
          //Update the list
          const foreignBody = JSON.stringify(newForeignList)
          res = await axios.put(
              'http://localhost:5000/api/lists',
              foreignBody,
              config
          )

          const newForeign = res.data

          console.log('updated list: ', newHome, newForeign)
          const newLists = [...this.state.lists]
          const homeIndex = newLists.findIndex(l => l.id === newHome.id)
          const foreignIndex = newLists.findIndex(l => l.id === newForeign.id)
      
          newLists[homeIndex] = newHome

          newLists[foreignIndex] = newForeign
      
          const projName = newHome.projectName
          
          const projectLists = newLists.filter(list => list.projectName === projName)
      
          this.setState({
            lists: newLists,
            projectLists: projectLists
          })

          //Call the handler and redirect
      } catch (error) {
          console.error(`Error creating lists: ${error.response.data}`)
      }
    }

    update()  
  }

  render() {
    const { projects, project, projectLists, list, projectNotes } = this.state

    return (
      <Router>
        <div className="App">
          <header className="App-header">Project Planner</header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/new-project">New Project</Link>
            {project ? (
              <Link to="/new-list">New List</Link>
            ) : (
              <Link to=""></Link>
            )}
          </nav>
          <main className="App-content">
            <Switch>
              <Route exact path="/">
                <ProjectList
                projects={projects}
                clickProject={this.viewProject}
                deleteProject={this.deleteProject}
                editProject={this.editProject}
                />
              </Route>
              <Route path="/projects/:projectId">
                <Project 
                project={project}
                projectLists={projectLists}
                projectNotes={projectNotes}
                editList={this.onListUpdated}
                createNewNote={this.createNewNote}
                updateListOrder={this.updateListOrder}
                updateNoteOrder={this.updateNoteOrder}
                updateNoteOrderTwo={this.updateNoteOrderTwo}
                />
                
              </Route>
              <Route path="/new-project">
                <CreateProject onProjectCreated={this.onProjectCreated}></CreateProject>
              </Route>
              <Route path="/edit-project/:projectId">
                <EditProject project={project} onProjectUpdated={this.onProjectUpdated}/>
              </Route>
              <Route path="/new-list">
                <CreateList project={project} onListCreated={this.onListCreated} onProjectUpdated={this.onProjectUpdated}></CreateList>
              </Route>
              <Route path="/new-note">
                <CreateNote project={project} list={list} onNoteCreated={this.onNoteCreated} onListUpdated={this.onListUpdated}></CreateNote>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
// lists={lists} notes={notes} editList={this.onListUpdated}

}

export default App
