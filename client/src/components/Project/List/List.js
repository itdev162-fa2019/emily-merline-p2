import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Droppable, Draggable } from 'react-beautiful-dnd'
//import CreateNote from './Project/List/CreateNote'
import Note from './Note'


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`
const Title = styled.h3`
    padding: 8px;
`
const NoteList = styled.div`
    padding: 8px;    
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
    flex-grow: 1;
    min-height: 100px;
`


const List = props => {
    
    const { list, projectNotes, index, editList, editNote, deleteList, deleteNote, createNewNote } = props
    let history = useHistory()

    const handleCreateNote = list => {
        createNewNote(list)
        history.push(`/new-note`)
    }

    const handleEditList = list => {
        editList(list)
        history.push(`/edit-list`)
    }


    let notes;

    if(list.notes.length < 1){
        notes = []
    }else {
        notes = list.notes.split(',')
    }
    console.log(`Notes array: ${notes}`)
    console.log(`Notes array length: ${notes.length}`)
        return (
            <Draggable draggableId={list.id} index={index}>
                {(provided)=> (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>
                        {list.title}
                        <button onClick={() => handleCreateNote(list)}>New Note</button>
                        <button onClick={() => handleEditList(list)}>Edit List</button>
                        <button onClick={() => deleteList(list)}>Delete List</button>
                    </Title>
                    <Droppable droppableId={list.id} type="note">
                    {(provided, snapshot) => (
                        <NoteList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                        { 
                        notes.map((noteId, index) => {
                            const note = projectNotes.find(note => note.id === noteId)
                            console.log(`Note error: ${note}`)
                            console.log(`NoteId: ${noteId}`)
                            return (
                                <Note key={note.id} note={note} list={list} index={index} editNote={editNote} deleteNote={deleteNote}/>
                            )
                        })}
                        {provided.placeholder}
                    </NoteList>
                    )}
                    </Droppable>
                </Container>
                )}
            </Draggable>

            )  
}

export default List