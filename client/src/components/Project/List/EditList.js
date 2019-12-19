import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const EditList = ({ onListUpdated }) => {
    let history = useHistory()
    const [listData, setListData] = useState({
        title: list.title
    })
    const { title } = listData
    
    const onChange = e => {
        const { name, value } = e.target 

        setListData({
            ...projectData,
            [name]: value
        })
    }

    const update = async () => {
        if(!title) {
            console.log('Title is required')
        } else {
            const newList = {
                id: list.id,
                title: title,
                projectName: list.projectName,
                notes: list.notes
            }

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                //Update the list
                const body = JSON.stringify(newList)
                const res = await axios.put(
                    'http://localhost:5000/api/lists',
                    body,
                    config
                )

                //Call the handler and redirect
                onListUpdated(res.data)
                history.push('/')
            } catch (error) {
                console.error(`Error creating lists: ${error.response.data}`)
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Edit List</h2>
            <input
                name="title"
                type="text"
                placeholder="List Name"
                value={title}
                onChange={e => onChange(e)}
            />
            <button onClick={() => update()}>Submit</button>
        </div>
    )
}

export default EditList