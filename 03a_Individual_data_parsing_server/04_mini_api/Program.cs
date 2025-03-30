// var builder = WebApplication.CreateBuilder(args);
// var app = builder.Build();

// app.MapGet("/", () => "Hello World!");

// app.Run();

using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<PersonDb>(opt => opt.UseInMemoryDatabase("PersonList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PersonAPI";
    config.Title = "PersonAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

// swagger
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "PersonAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

// endpoints

app.MapGet("/persons", async (PersonDb db) => 
    await db.Persons.ToListAsync());

app.MapGet("/Persons/{name}", async (string name, PersonDb db) => 
    await db.Persons.FindAsync(name)
        is Person person ? Results.Ok(person) : Results.NotFound());

app.MapPost("/Persons", async (Person person, PersonDb db) => 
    {
        db.Persons.Add(person);
        await db.SaveChangesAsync();
        return Results.Created($"/Persons/{person.Id}", person);
    });

app.MapPut("/persons/{id}", async (int id, Person inputPerson, PersonDb db) => 
{
    var person = await db.Persons.FindAsync(id);

    if (person is null) return Results.NotFound();

    person.Name = inputPerson.Name;
    person.Age = inputPerson.Age;
    person.Hobbies = inputPerson.Hobbies;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/persons/{id}", async (int id, PersonDb db) => 
{
    if (await db.Persons.FindAsync(id) is Person person)
    {
        db.Persons.Remove(person);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

// start app

app.Run();