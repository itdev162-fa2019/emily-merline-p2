import React, { useState } from 'react'
import axios from 'axios'
import uuid from 'uuid'
import { useHistory } from 'react-router-dom'
import slugify from 'slugify'


const CreateList = ({ project, onListCreated, onProjectUpdated }) => {
    let history = useHistory()
    const [listData, setListData] = useState({
        title: ''
    })
    const { title } = listData
    
    const onChange = e => {
        const { name, value } = e.target 

        setListData({
            ...listData,
            [name]: value
        })
    }

    const create = async () => {
        if(!title) {
            console.log('Title is required')
        } else {

            const listId = uuid.v4()

            const newList = {
                id: listId,
                title: title,
                projectName: project.name,
                notes: ''
            }

            let newProjListsString = ''
            if(project.lists !== ''){
                const currProjLists = project.lists.split(',')
                const newProjLists = [...currProjLists, listId]
                newProjListsString = newProjLists.toString()
            } else {
                newProjListsString = listId
            }


            const newProject = {
                id: project.id,
                name: project.name,
                lists: newProjListsString
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                //Create the post
                const body = JSON.stringify(newList)
                let res = await axios.post(
                    'http://localhost:5000/api/lists',
                    body,
                    config
                )

                onListCreated(res.data)

                //Create the post
                const projBody = JSON.stringify(newProject)
                res = await axios.put(
                    'http://localhost:5000/api/projects',
                    projBody,
                    config
                )

                //Call the handler and redirect
                onProjectUpdated(res.data)
                const slug = slugify(project.name, { lower: true })
                history.push(`/projects/${slug}`)
            } catch (error) {
                console.error(`Error creating lists: ${error.response.data}`)
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Create New List</h2>
            <input
                name="title"
                type="text"
                placeholder="List Name"
                value={title}
                onChange={e => onChange(e)}
            />
            <button onClick={() => create()}>Submit</button>
        </div>
    )
}

export default CreateList