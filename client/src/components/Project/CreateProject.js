import React, { useState } from 'react'
import axios from 'axios'
import uuid from 'uuid'
import { useHistory } from 'react-router-dom'


const CreateProject = ({ onProjectCreated }) => {
    let history = useHistory()
    const [projectData, setProjectData] = useState({
        name: ''
    })
    const { name } = projectData
    
    const onChange = e => {
        const { name, value } = e.target 

        setProjectData({
            ...projectData,
            [name]: value
        })
    }

    const create = async () => {
        if(!name) {
            console.log('Name is required')
        } else {
            const newProject = {
                id: uuid.v4(),
                name: name,
                lists: ''
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                //Create the post
                const body = JSON.stringify(newProject)
                const res = await axios.post(
                    'http://localhost:5000/api/projects',
                    body,
                    config
                )

                //Call the handler and redirect
                onProjectCreated(res.data)
                history.push('/')
            } catch (error) {
                console.error(`Error creating projects: ${error.response.data}`)
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Create New Project</h2>
            <input
                name="name"
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={e => onChange(e)}
            />
            <button onClick={() => create()}>Submit</button>
        </div>
    )
}

export default CreateProject