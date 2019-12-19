import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const EditProject = ({ project, onProjectUpdated }) => {
    let history = useHistory()
    const [projectData, setProjectData] = useState({
        name: project.name,
        status: project.status
    })
    const { name } = projectData
    
    const onChange = e => {
        const { name, value } = e.target 

        setProjectData({
            ...projectData,
            [name]: value
        })
    }

    const update = async () => {
        if(!name) {
            console.log('Name is required')
        } else {
            const newProject = {
                id: project.id,
                name: name,
                lists: project.lists
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                //Create the post
                const body = JSON.stringify(newProject)
                const res = await axios.put(
                    'http://localhost:5000/api/projects',
                    body,
                    config
                )

                //Call the handler and redirect
                onProjectUpdated(res.data)
                history.push('/')
            } catch (error) {
                console.error(`Error creating projects: ${error.response.data}`)
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Edit Project</h2>
            <input
                name="name"
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={e => onChange(e)}
            />
            <button onClick={() => update()}>Submit</button>
        </div>
    )
}

export default EditProject