import React, { useState } from 'react'
import axios from 'axios'
import uuid from 'uuid'
import { useHistory } from 'react-router-dom'
import slugify from 'slugify'


const CreateNote = ({ project, list, onNoteCreated, onListUpdated }) => {
    let history = useHistory()
    const [noteData, setNoteData] = useState({
        content: ''
    })
    const { content } = noteData

    const onChange = e => {
        const { name, value } = e.target 

        setNoteData({
            ...noteData,
            [name]: value
        })
    }

    const create = async () => {
        if(!content) {
            console.log('Content is required')
        } else {

            const noteId = uuid.v4()

            const newNote = {
                id: noteId,
                content: content,
                projectName: project.name
            }

            let newListNotesString = ''
            if(list.notes !== ''){
                const currListNotes = list.notes.split(',')
                const newListNotes = [...currListNotes, noteId]
                newListNotesString = newListNotes.toString()
            } else {
                newListNotesString = noteId
            }

            const newList = {
                id: list.id,
                title: list.title,
                projectName: list.projectName,
                notes: newListNotesString
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                //Create the post
                const body = JSON.stringify(newNote)
                let res = await axios.post(
                    'http://localhost:5000/api/notes',
                    body,
                    config
                )

                onNoteCreated(res.data)

                const listBody = JSON.stringify(newList)
                res = await axios.put(
                    'http://localhost:5000/api/lists',
                    listBody,
                    config
                )

                //Call the handler and redirect
                onListUpdated(res.data)
                const slug = slugify(project.name, { lower: true })
                history.push(`/projects/${slug}`)
            } catch (error) {
                console.error(`Error creating notes: ${error.response.data}`)
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Create New Note</h2>
            <textarea
                name="content"
                cols="30"
                rows="10"
                value={content}
                onChange={e => onChange(e)}
            ></textarea>
            <button onClick={() => create()}>Submit</button>
        </div>
    )
}

export default CreateNote