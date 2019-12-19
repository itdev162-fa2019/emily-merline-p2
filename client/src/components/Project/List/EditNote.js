import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import slugify from 'slugify'

const EditNote = ({ note, onNoteUpdated, project }) => {
    let history = useHistory()
    const [noteData, setNoteData] = useState({
        content: note.content
    })
    const { content } = noteData
    
    const onChange = e => {
        const { name, value } = e.target 

        setNoteData({
            ...noteData,
            [name]: value
        })
    }

    const update = async () => {
        if(!content) {
            console.log('Content is required')
        } else {
            const newNote = {
                id: note.id,
                content: content,
                projectName: note.projectName
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                //Update the note
                const body = JSON.stringify(newNote)
                const res = await axios.put(
                    'http://localhost:5000/api/notes',
                    body,
                    config
                )

                //Call the handler and redirect
                onNoteUpdated(res.data)
                const slug = slugify(project.name, { lower: true })
                history.push(`/projects/${slug}`)
            } catch (error) {
                console.error(`Error creating lists: ${error.response.data}`)
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Edit Note</h2>
            <input
                name="content"
                type="text"
                placeholder="Note Content"
                value={content}
                onChange={e => onChange(e)}
            />
            <button onClick={() => update()}>Submit</button>
        </div>
    )
}

export default EditNote