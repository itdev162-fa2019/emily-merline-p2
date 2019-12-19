using System;

namespace Domain
{
    public class Note
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public string ProjectName { get; set; } 

    }
}