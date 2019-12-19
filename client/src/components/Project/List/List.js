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
    
    const { list, projectNotes, index, editList, createNewNote } = props
    let history = useHistory()

    const handleCreateNote = list => {
        createNewNote(list)
        history.push(`/new-note`)
    }

    let notes;

    if(list.notes.length < 1){
        notes = []
    }else {
        notes = list.notes.split(',')
    }

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
                            return (
                                <Note key={note.id} note={note} index={index}/>
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