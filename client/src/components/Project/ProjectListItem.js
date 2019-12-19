import React from 'react'
import { useHistory } from 'react-router-dom'
import slugify from 'slugify'


const ProjectListItem = props => {
    const { project, clickProject, deleteProject, editProject } = props
    const history = useHistory()

    const handleClickProject = project => {
        const slug = slugify(project.name, { lower: true })

        clickProject(project)
        history.push(`/projects/${slug}`)
    }

    const handleEditProject = project => {
        editProject(project)
        history.push(`/edit-project/${project.id}`)
    }

    return (
        <div>
        <div className="projectListItem" onClick={() => handleClickProject(project)}>
            <h2>{project.name}</h2>
        </div>
        <div className="projectControls">
            <button onClick={() => deleteProject(project)}>Delete</button>
            <button onClick={() => handleEditProject(project)}>Edit</button>
        </div>
        </div>

    )
}

export default ProjectListItem