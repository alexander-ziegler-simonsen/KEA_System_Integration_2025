// See https://aka.ms/new-console-template for more information

Console.WriteLine("Hello, World!");

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


string csvText = GetTextFromFIle("/data/me.csv");
string xmlText = GetTextFromFIle("/data/me.xml");
string txtText = GetTextFromFIle("/data/me.txt");
string jsonText = GetTextFromFIle("/data/me.json");
string yamlText = GetTextFromFIle("/data/me.yaml");



Console.WriteLine("-----------------------------------------");
Console.WriteLine("txtText");
Console.WriteLine(txtText);

Console.WriteLine("-----------------------------------------");
Console.WriteLine("xmlText");
Console.WriteLine(xmlText);

Console.WriteLine("-----------------------------------------");
Console.WriteLine("jsonText");
Console.WriteLine(jsonText);

Console.WriteLine("-----------------------------------------");
Console.WriteLine("csvText");
Console.WriteLine(csvText);

Console.WriteLine("-----------------------------------------");
Console.WriteLine("yamlText");
Console.WriteLine(yamlText);