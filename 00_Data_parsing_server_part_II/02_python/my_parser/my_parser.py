
import csv
import xml.etree.ElementTree as ET # native libarry,  # https://docs.python.org/3/library/xml.etree.elementtree.html
from ruamel.yaml import YAML
from . import Person

class My_parser():

    def __init__(self):
        pass

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


