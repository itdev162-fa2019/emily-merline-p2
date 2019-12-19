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
    public class NotesController : ControllerBase
    {
        private readonly DataContext context;

        public NotesController(DataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// GET api/notes
        /// </summary>
        /// <returns>A list of notes</returns>
        [HttpGet]
        public ActionResult<List<Note>> Get()
        {
            return this.context.Notes.ToList();
        }

        /// <summary>
        /// GET api/note/[id]
        /// </summary>
        /// <param name="id">Note id</param>
        /// <returns>A single note</returns>
        [HttpGet("{id}")]
        public ActionResult<Note> GetById(Guid id)
        {
            return this.context.Notes.Find(id);
        }

        /// <summary>
        /// POST api/post
        /// </summary>
        /// <param name="request">JSON request containing note fields</param>
        /// <returns>A new note</returns>
        [HttpPost]
        public ActionResult<Note> Create([FromBody]Note request)
        {
            var note = new Note
            {
                Id = request.Id,
                Content = request.Content,
                ProjectName = request.ProjectName
            };

            context.Notes.Add(note);
            var success = context.SaveChanges() > 0;

            if (success)
            {
                return note;
            }

            throw new Exception("Error creating note");
        }

        /// <summary>
        /// PUT api/put
        /// </summary>
        /// <param name="request">JSON request containing one or more updated note fields</param>
        /// <returns>An updated note</returns>
        [HttpPut]
        public ActionResult<Note> Update([FromBody]Note request)
        {
            var note = context.Notes.Find(request.Id);

            if(request == null)
            {
                throw new Exception("Could not find note");
            }

            //Update the post properties with request values, if present.
            note.Content = request.Content != null ? request.Content : note.Content;
            note.ProjectName = request.ProjectName != null ? request.ProjectName : note.ProjectName;

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return note;
            }

            throw new Exception("Error updating note");
        }

        /// <summary>
        /// DELETE api/note/[id]
        /// </summary>
        /// <param name="id">Note id</param>
        /// <returns>True, if successful</returns>
        [HttpDelete("{id}")]

        public ActionResult<bool> Delete(Guid id)
        {
            var note = context.Notes.Find(id);

            if (note == null)
            {
                throw new Exception("Could not find note");
            }

            context.Remove(note);

            var success = context.SaveChanges() > 0;

            if (success)
            {
                return true;
            }

            throw new Exception("Error deleting note");
        }
        
    }
}