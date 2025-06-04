using System.Xml.Serialization;
using Csv;
using Newtonsoft.Json;
using YamlDotNet.Serialization;
using Microsoft.AspNetCore.Components.Forms;

var serverA = "http://localhost:8080"; // remmember to point correctly
var builder = WebApplication.CreateBuilder(args);

// swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PersonAPI";
    config.Title = "PersonAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

var httpClient = new HttpClient();

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

string ReadFromFile(string localFolderPath) 
{
    string workingDirectory = Environment.CurrentDirectory;

    TextReader read = new StreamReader(workingDirectory + localFolderPath);
    string text = read.ReadToEnd();

    return text;
}

Person ParseXml(string input)
{   
    // TODO - fix this parser
    Console.WriteLine("DEBUG---------", input);
    Console.WriteLine(input);

    XmlSerializer Serializer = new XmlSerializer(typeof(Person), new XmlRootAttribute("note"));
    TextReader Reader = new StringReader(input);
    
    // TODO - fix array "hobbies" not being read right

    var output = (Person)Serializer.Deserialize(Reader);

    Console.WriteLine("DEBUG---------", output);
    Console.WriteLine(input);
    
    return output;
}

Person Parsejson(string input)
{   
    // serialisation
    // var personJson = JsonConvert.SerializeObject(PersonObj);
    
    // Deserialise
    var person = JsonConvert.DeserializeObject<Person>(input);
    
    return person;
}

Person ParseYaml(string input)
{
    // TODO - fix this parser
    Console.WriteLine("DEBUG---------", input);
    Console.WriteLine(input);
    
    // the builder class, that handles all the logic
    var deserializer = new DeserializerBuilder().Build();
    Console.WriteLine("DEBUG---------", deserializer);
    
    // the Derserialize will try to typecast our string as a "Person" object.
    var p = deserializer.Deserialize<Person>(input);
    Console.WriteLine("DEBUG---------", p);

    return p;
}

Person ParseCsv(string input)
{
    // https://github.com/stevehansen/csv/
    
    // it does it me here, that I need to be able to handle more than one "person" per file
    // TODO - make every parser able to handle multiple "person" objects

    List<Person> people = new List<Person>();

    foreach (var line in CsvReader.ReadFromText(input))
    {
        Person tempP = new Person(line["name"], Convert.ToInt32(line["age"]), line["hobbies"].Split(";"));
        people.Add(tempP);
    }

    return people[0];
}

Person ParseTxt(string input)
{
    // we have to make this our self
    
    // each new line from the txt file, starts with "\r\n\"
    // here I know there is only one element in the file, so the logic will be easier to implement 
    
    // "name= Value"
    // key at start, "= " , followed by "value"
    // one key/value pair per line

    
    string[] lines = input.Split("\r\n");

    //              index   split on    get value
    string pName = lines[0].Split("= ")[1];
    int pAge = Convert.ToInt32(lines[1].Split("= ")[1]);
    
    
    string tempHobbies = lines[2].Split("= ")[1];
    //             string array    split on .... get string array as return
    string[] pHobbies = tempHobbies.Split(", ");

    Person output = new Person(pName, pAge, pHobbies);
    
    return output;
}

// endpoints
app.MapGet("/json", async () =>
{
    string json = await httpClient.GetStringAsync($"{serverA}/json-internal");
    Person person = Parsejson(json);
    return Results.Json(person); 
});

app.MapGet("/xml", async () =>
{
    string xml = await httpClient.GetStringAsync($"{serverA}/xml-internal");
    Person person = ParseXml(xml);
    return Results.Json(person);
});

app.MapGet("/yaml", async () =>
{
    string yaml = await httpClient.GetStringAsync($"{serverA}/yaml-internal");
    Person person = ParseYaml(yaml);
    return Results.Json(person);
});

app.MapGet("/txt", async () =>
{
    string txt = await httpClient.GetStringAsync($"{serverA}/txt-internal");
    Person person = ParseTxt(txt);
    return Results.Json(person);
});

app.MapGet("/csv", async () =>
{
    string csv = await httpClient.GetStringAsync($"{serverA}/csv-internal");
    Person person = ParseCsv(csv);
    return Results.Json(person);
});

app.MapGet("/xml-internal", () => {
    string xmlText = ReadFromFile("/data/me.xml"); 
    return Results.Text(xmlText, "application/xml");

});

app.MapGet("/json-internal", () => {
    string jsonText = ReadFromFile("/data/me.json"); 
    return Results.Text(jsonText, "application/json");
});

app.MapGet("/yaml-internal", () => {
    string yamlText = ReadFromFile("/data/me.yaml"); 
    return Results.Text(yamlText, "text/yaml");

});

app.MapGet("/txt-internal", () => {
    string txtText = ReadFromFile("/data/me.txt"); 
    return Results.Text(txtText, "text/plain");

});

app.MapGet("/csv-internal", () => {
    string csvText = ReadFromFile("/data/me.csv"); 
    return Results.Text(csvText, "text/csv");

});

app.Run();