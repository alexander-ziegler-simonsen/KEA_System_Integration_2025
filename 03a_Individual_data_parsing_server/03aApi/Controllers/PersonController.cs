using Microsoft.AspNetCore.Mvc;

namespace _03aApi.Controllers;

[ApiController]
[Route("[controller]")]
public class PersonController : ControllerBase
{
    // private static readonly string[] Summaries = new[]
    // {
    //     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    // };

    private readonly ILogger<PersonController> _logger;

    public PersonController(ILogger<PersonController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetPeople")]
    public IEnumerable<Person> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new Person
        {
            Name = "kim",
            Age = 14,
            Hobbies = ["1", "2", "3"]
        })
        .ToArray();
    }
}
