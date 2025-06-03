public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public string[] Hobbies { get; set; }

    public Person(string name, int age, string[] hobbies)
    {
        Name = name;
        Age = age;
        Hobbies = hobbies;
    }

    public Person()
    {
        
    }
}