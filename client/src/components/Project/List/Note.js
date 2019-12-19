import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

`
const Note = props => {

    const { note, index } = props

        return (
            <Draggable draggableId={note.id} index={index}>
                {(provided, snapshot) => (
                    <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    >
                    {note.content}
                    </Container>
                )}
            </Draggable>
        ) 
}

export default Note