
import csv
import xml.etree.ElementTree as ET # native libarry,  # https://docs.python.org/3/library/xml.etree.elementtree.html
from ruamel.yaml import YAML
import json


class Person:
    name: str
    age: int
    hobbies: list[str]

    def __init__(self, name: str, age: int, hobbies: list[str]):
        self.name = name
        self.age = age
        self.hobbies = hobbies
    
    def print(self):
        return "name: " + self.name + " , age: " + str(self.age) + " , hobbies: " + ', '.join(self.hobbies)


def readFromFile(path: str):
    # TODO - try and catch, since path could be wrong or the file is gone
    output = open(path, "r")
    return output.read()


def ParseJson(input: str):
    data = json.loads(input)

    return Person(data["name"], data["age"], data["hobbies"])


def ParseYaml(input: str):
    # https://yaml.dev/doc/ruamel.yaml/example/#top 

    yaml = YAML()
    data = yaml.load(input)

    return Person(data['name'], data['age'], data['hobbies'])


def ParseCsv(path: str):

    heads = ""
    #elements = []
    element = ""
    first = False

    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=",")
        for row in reader:
            if(first == False):
                heads = row
                first = True
            else:
                element = row

    # TODO - handle more than one obj - this program only handle one obj, but these files will have more than one obj in them    
    hobbies = element[2].split(";")

    return Person(element[0], element[1], hobbies)

def ParseXml(input: str):
    root = ET.fromstring(input)

    # print(root.find("name").text, root.find("age").text, len(root.find("hobbies")))

    hobbies: list[str] = []

    for child in root.find("hobbies"):
        hobbies.append(child.text)

    return Person(root.find("name").text, root.find("age").text, hobbies)

def ParseTxt(input: str):
    print(input)

    lines = input.split("\n")
    pName = (lines[0].split("= "))
    pAge = (lines[1].split("= "))
    pHobbies = (lines[2].split("= "))
    pAllHobies = pHobbies[1]
    pAllHobies = pAllHobies.split(", ")

    return Person(pName[1], pAge[1], pAllHobies)


# xml
print("------------- XML parse ------------------------------")
xmlText = readFromFile("./data/me.xml")
xmlPerson: Person = ParseXml(xmlText)
print(xmlPerson.print())


# json
print("------------- Json parse ------------------------------")
jsonText = readFromFile("./data/me.json")
jsonPerson: Person = ParseJson(jsonText)
print(jsonPerson.print())

# yaml
print("------------- yaml parse ------------------------------")
yamlText = readFromFile("./data/me.yaml")
yamlPerson: Person = ParseYaml(yamlText)
print(yamlPerson.print())

# csv 
print("------------- start of csv ------------------------------")

# csvText = readFromFile("./data/me.csv")
# here we send path to parseCsv (because I can't get csv to work with string right now)
csvPerson: Person = ParseCsv("./data/me.csv")
print(csvPerson.print())

# txt
print("------------- txt parse ------------------------------")
txtText = readFromFile("./data/me.txt")
txtPerson: Person = ParseTxt(txtText)
print(txtPerson.print())