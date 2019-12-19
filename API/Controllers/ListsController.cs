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
    public class ListsController : ControllerBase
    {
        private readonly DataContext context;

        public ListsController(DataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// GET api/lists
        /// </summary>
        /// <returns>A list of lists</returns>
        [HttpGet]
        public ActionResult<List<List>> Get()
        {
            return this.context.Lists.ToList();
        }

        /// <summary>
        /// GET api/list/[id]
        /// </summary>
        /// <param name="id">List id</param>
        /// <returns>A single list</returns>
        [HttpGet("{id}")]
        public ActionResult<List> GetById(Guid id)
        {
            return this.context.Lists.Find(id);
        }

        /// <summary>
        /// POST api/post
        /// </summary>
        /// <param name="request">JSON request containing list fields</param>
        /// <returns>A new list</returns>
        [HttpPost]
        public ActionResult<List> Create([FromBody]List request)
        {
            var list = new List
            {
                Id = request.Id,
                Title = request.Title,
                ProjectName = request.ProjectName,
                Notes = request.Notes
            };

            context.Lists.Add(list);
            var success = context.SaveChanges() > 0;

            if (success)
            {
                return list;
            }

            throw new Exception("Error creating list");
        }

        /// <summary>
        /// PUT api/put
        /// </summary>
        /// <param name="request">JSON request containing one or more updated list fields</param>
        /// <returns>An updated list</returns>
        [HttpPut]
        public ActionResult<List> Update([FromBody]List request)
        {
            var list = context.Lists.Find(request.Id);

            if(request == null)
            {
                throw new Exception("Could not find list");
            }

            //Update the post properties with request values, if present.
            list.Title = request.Title != null ? request.Title : list.Title;
            list.ProjectName = request.ProjectName != null ? request.ProjectName : list.ProjectName;
            list.Notes = request.Notes != null ? request.Notes : list.Notes;

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return list;
            }

            throw new Exception("Error updating list");
        }

        /// <summary>
        /// DELETE api/list/[id]
        /// </summary>
        /// <param name="id">List id</param>
        /// <returns>True, if successful</returns>
        [HttpDelete("{id}")]

        public ActionResult<bool> Delete(Guid id)
        {
            var list = context.Lists.Find(id);

            if (list == null)
            {
                throw new Exception("Could not find list");
            }

            context.Remove(list);

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return true;
            }

            throw new Exception("Error deleting list");
        }
    }
}