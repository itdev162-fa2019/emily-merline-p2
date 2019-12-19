import React from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import List from "./List/List"

const Container = styled.div`
    display: flex;
`

const Project = props => {
    const { project, projectLists, projectNotes, editList, createNewNote, updateListOrder, updateNoteOrder, updateNoteOrderTwo } = props

   const onDragEnd = result => {
        const { destination, source, draggableId, type } = result
        
        if(!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        if(type === "list"){
            
            const newListOrder = project.lists.split(',')
            newListOrder.splice(source.index, 1)
            newListOrder.splice(destination.index, 0, draggableId)

            const listString = newListOrder.toString()
            updateListOrder(project, listString)
            return
        }

        const listOrder = project.lists.split(',')

        //these are just the ids
        const home = listOrder.find(listId => listId === source.droppableId)
        const foreign = listOrder.find(listId => listId === destination.droppableId)
        console.log(`home: ${home}`)
        console.log(`foreign: ${foreign}`)

        const homeList= projectLists.find(list => list.id === home)
        const foreignList = projectLists.find(list => list.id === foreign)

        if(home === foreign) {
            const newNotesOrder = homeList.notes.split(',')
            newNotesOrder.splice(source.index, 1)
            newNotesOrder.splice(destination.index, 0, draggableId)
    
            const notesString = newNotesOrder.toString()

            updateNoteOrder(homeList, notesString)
            return
        }

        //Moving from one list to another
        const homeNotesOrder = homeList.notes.split(',')
        homeNotesOrder.splice(source.index, 1)
        const homeNotesString = homeNotesOrder.toString()

        const foreignNotesOrder = foreignList.notes.split(',')
        foreignNotesOrder.splice(destination.index, 0, draggableId)
        const foreignNotesString = foreignNotesOrder.toString()

        updateNoteOrderTwo(homeList, foreignList, homeNotesString,foreignNotesString)
    }

    if(projectLists.length > 0){
        return (
            <div>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
            <Droppable
            droppableId={project.id}
            direction="horizontal"
            type="list"
            >
            {provided=> (
            <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
            {
                project.lists.split(',').map((listId, index) => {
                const list = projectLists.find(list => list.id === listId)
                return <List
                key={list.id}
                list={list}
                projectNotes={projectNotes}
                index={index}
                editList={editList}
                createNewNote={createNewNote}
                />
            })}  
            {provided.placeholder}  
            </Container>
            )}
            </Droppable>
            </DragDropContext>
            </div>
            )
    } else {
        return (
            <div>

            </div>
        )
    }
    
}
export default Project


