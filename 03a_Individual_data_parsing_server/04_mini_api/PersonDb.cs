using Microsoft.EntityFrameworkCore;

class PersonDb : DbContext
{
    public PersonDb(DbContextOptions<PersonDb> options) : base(options) {}

    public DbSet<Person> Persons => Set<Person>();
}