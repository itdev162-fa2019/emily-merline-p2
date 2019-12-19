using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly DataContext context;

        public ProjectsController(DataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// GET api/projects
        /// </summary>
        /// <returns>A list of projects</returns>
        [HttpGet]
        public ActionResult<List<Project>> Get()
        {
            return this.context.Projects.ToList();
        }

        /// <summary>
        /// GET api/project/[id]
        /// </summary>
        /// <param name="id">Project id</param>
        /// <returns>A single project</returns>
        [HttpGet("{id}")]
        public ActionResult<Project> GetById(Guid id)
        {
            return this.context.Projects.Find(id);
        }

        /// <summary>
        /// POST api/post
        /// </summary>
        /// <param name="request">JSON request containing project fields</param>
        /// <returns>A new project</returns>
        [HttpPost]
        public ActionResult<Project> Create([FromBody]Project request)
        {
            var project = new Project
            {
                Id = request.Id,
                Name = request.Name,
                Lists = request.Lists
            };

            context.Projects.Add(project);
            var success = context.SaveChanges() > 0;

            if (success)
            {
                return project;
            }

            throw new Exception("Error creating project");
        }

        /// <summary>
        /// PUT api/put
        /// </summary>
        /// <param name="request">JSON request containing one or more updated project fields</param>
        /// <returns>An updated project</returns>
        [HttpPut]
        public ActionResult<Project> Update([FromBody]Project request)
        {
            var project = context.Projects.Find(request.Id);

            if(request == null)
            {
                throw new Exception("Could not find project");
            }

            //Update the post properties with request values, if present.
            project.Name = request.Name != null ? request.Name : project.Name;
            project.Lists = request.Lists != null ? request.Lists :  project.Lists;

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return project;
            }

            throw new Exception("Error updating project");
        }

        /// <summary>
        /// DELETE api/projects/[id]
        /// </summary>
        /// <param name="id">Project id</param>
        /// <returns>True, if successful</returns>
        [HttpDelete("{id}")]

        public ActionResult<bool> Delete(Guid id)
        {
            var project = context.Projects.Find(id);

            if (project == null)
            {
                throw new Exception("Could not find project");
            }

            context.Remove(project);

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return true;
            }

            throw new Exception("Error deleting project");
        }
    }
}