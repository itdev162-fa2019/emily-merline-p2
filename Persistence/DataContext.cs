using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        
        public DbSet<Project> Projects { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<Note> Notes { get; set; }
        
        public DataContext(DbContextOptions options) : base(options)
        {

        }


    }
}