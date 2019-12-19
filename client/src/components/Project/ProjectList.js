import React from 'react'
import ProjectListItem from './ProjectListItem'

const ProjectList = props => {
    const { projects, clickProject, deleteProject, editProject } = props;
    return projects.map(project => (
    <ProjectListItem 
    key={project.id} 
    project={project} 
    clickProject={clickProject} 
    deleteProject={deleteProject}
    editProject={editProject}
    />
    ))
}

export default ProjectList