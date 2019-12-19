import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

`
const Note = props => {

    const { note, list, index, editNote, deleteNote } = props
    let history = useHistory()

    const handleEditNote = note => {
        editNote(note)
        history.push(`/edit-note`)
    }


        return (
            <Draggable draggableId={note.id} index={index}>
                {(provided, snapshot) => (
                    <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    >
                    <div>
                    {note.content}
                    </div>
                    <button onClick={() => handleEditNote(note)}>Edit Note</button>
                    <button onClick={() => deleteNote(note, list)}>Delete Note</button>
                    </Container>
                )}
            </Draggable>
        ) 
}

export default Note