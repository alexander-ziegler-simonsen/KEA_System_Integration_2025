using System.Xml.Serialization;
using Csv;
using Newtonsoft.Json;
using YamlDotNet.Serialization;

public class Converter()
{
    string ReadFromFile(string localFolderPath)
    {
        // we need the project root path, since the "program.cs" gets run inside "./bin/denug/net8-0/"
        string workingDirectory = Environment.CurrentDirectory;

        // this could be written better, but it works for now
        string currentRoot = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

        TextReader read = new StreamReader(currentRoot + localFolderPath);
        string text = read.ReadToEnd();

        return text;
    }

    ConPerson ParseXml(string input)
    {
        // https://learn.microsoft.com/en-us/dotnet/api/system.xml.serialization.xmlserializer.deserialize?view=net-8.0
        // root tag "note" is giving problems, so found these
        // https://learn.microsoft.com/en-us/dotnet/api/system.xml.serialization.xmlrootattribute?view=net-8.0
        // https://learn.microsoft.com/en-us/dotnet/api/system.xml.serialization.xmlrootattribute.-ctor?view=net-8.0

        // typecast your xml elements in your data class - this fixed the array problem I had
        // https://learn.microsoft.com/en-us/dotnet/standard/serialization/controlling-xml-serialization-using-attributes

        XmlSerializer Serializer = new XmlSerializer(typeof(ConPerson), new XmlRootAttribute("note"));
        TextReader Reader = new StringReader(input);

        // TODO - fix array "hobbies" not being read right

        var output = (ConPerson)Serializer.Deserialize(Reader);

        return output;
    }

    ConPerson Parsejson(string input)
    {
        // https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/how-to
        // https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/deserialization 
        // var person = JsonSerializer.Deserialize<ConPerson>(input); // didn't work

        //var personJson = JsonConvert.SerializeObject(person)

        // https://www.nuget.org/packages/newtonsoft.json/

        // serialisation
        // var personJson = JsonConvert.SerializeObject(PersonObj);

        // Deserialise
        var person = JsonConvert.DeserializeObject<ConPerson>(input);

        return person;
    }

    ConPerson ParseYaml(string input)
    {
        // I'm using YamlDotNet
        // https://github.com/aaubry/YamlDotNet

        // we have the file data as "input", now we will convert it to an obj

        // the builder class, that handles all the logic
        var deserializer = new DeserializerBuilder().Build();

        // the Derserialize will try to typecast our string as a "ConPerson" object.
        var p = deserializer.Deserialize<ConPerson>(input);

        return p;
    }

    ConPerson ParseCsv(string input)
    {
        // https://github.com/stevehansen/csv/

        // it does it me here, that I need to be able to handle more than one "person" per file
        // TODO - make every parser able to handle multiple "person" objects

        List<ConPerson> people = new List<ConPerson>();

        foreach (var line in CsvReader.ReadFromText(input))
        {
            ConPerson tempP = new ConPerson(line["name"], Convert.ToInt32(line["age"]), line["hobbies"].Split(";"));
            people.Add(tempP);
        }

        return people[0];
    }

    ConPerson ParseTxt(string input)
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

        ConPerson output = new ConPerson(pName, pAge, pHobbies);

        return output;
    }
}


public class ConPerson
{
    public string name;
    public int age;

    // only needed for the xml parsing


    [XmlArray("hobbies")]       // the name of the main "array" tag 
    [XmlArrayItem("hobby")]     // the name of the "arrayItem" tag
    public string[] hobbies;

    public ConPerson(string name, int age, string[] hobbies)
    {
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }

    public ConPerson()
    {

    }

    public string printConPerson()
    {
        string allHobbies = "[";
        int counter = 0;
        foreach (string hobby in hobbies)
        {
            allHobbies += "'" + hobby + "'";
            counter++;
            if (hobbies.Length > counter)
                allHobbies += ", ";
        }

        allHobbies += "]";

        return "name: " + name + ", age: " + age + ", hobbies: " + allHobbies;
    }
}