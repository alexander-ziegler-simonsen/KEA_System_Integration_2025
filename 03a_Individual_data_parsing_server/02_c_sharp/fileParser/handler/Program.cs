// See https://aka.ms/new-console-template for more information

using YamlDotNet.Core;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

string GetTextFromFIle(string localFolderPath) 
{
    // we need the project root path, since the "program.cs" gets run inside "bin/denug/net8-0/"
    string workingDirectory = Environment.CurrentDirectory;

    //Console.WriteLine(workingDirectory);

    // this could be written better, but it works for now
    string currentRoot = Directory.GetParent(workingDirectory).Parent.Parent.FullName;

    //Console.WriteLine(currentRoot);
    
    TextReader read = new StreamReader(currentRoot + localFolderPath);
    string text = read.ReadToEnd();

    return text;
}

Person ParseXml(string input)
{
    Console.WriteLine("parseXml");
    return new Person("2", 2, ["s"]);
}

Person Parsejson(string input)
{
    Console.WriteLine("parseJson");
    return new Person("2", 2, ["s"]);
}


Person ParseYaml(string input)
{
    // I'm using YamlDotNet
    // https://github.com/aaubry/YamlDotNet
    
    // we have the file data as "input", now we will convert it to an obj
    
    // the builder class, that handles all the logic
    var deserializer = new DeserializerBuilder().Build();
    
    // the Derserialize will try to typecast our string as a "Person" object.
    var p = deserializer.Deserialize<Person>(input);
    
    return p;
}

Person ParseTxt(string input)
{
    Console.WriteLine("parseTxt");
    return new Person("2", 2, ["s"]);
}

Person ParseJson(string input)
{
    Console.WriteLine("parseJson");
    return new Person("2", 2, ["s"]);
}

string csvText = GetTextFromFIle("/data/me.csv");
string xmlText = GetTextFromFIle("/data/me.xml");
string txtText = GetTextFromFIle("/data/me.txt");
string jsonText = GetTextFromFIle("/data/me.json");
string yamlText = GetTextFromFIle("/data/me.yaml");



// Console.WriteLine("-----------------------------------------");
// Console.WriteLine("txtText");
// Console.WriteLine(ParseTxt(txtText));

// Console.WriteLine("-----------------------------------------");
// Console.WriteLine("xmlText");
// Console.WriteLine(xmlText);

// Console.WriteLine("-----------------------------------------");
// Console.WriteLine("jsonText");
// Console.WriteLine(jsonText);

// Console.WriteLine("-----------------------------------------");
// Console.WriteLine("csvText");
// Console.WriteLine(csvText);

Console.WriteLine("-----------------------------------------");
Console.WriteLine("yamlText");
Person tempP = ParseYaml(yamlText);
Console.WriteLine(tempP.printPerson());

public class Person
{
    public string name;
    public int age;
    public string[] hobbies;

    public Person(string name, int age, string[] hobbies)
    {
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }

    public Person()
    {
        
    }

    public string printPerson()
    {
        string allHobbies = "[";
        foreach (string hobby in hobbies)
        {
            allHobbies += "'" + hobby + "'";
        }

        allHobbies += "]";
        
        return name + ", " + age + ", " + allHobbies;
    }
}