
import csv
import xml.etree.ElementTree as ET # native libarry,  # https://docs.python.org/3/library/xml.etree.elementtree.html
# from ruamel.yaml.main import round_trip_load as yaml_load
import yaml
import json

print("------------- start of XML ------------------------------")

# xml
file_xml_reading = open("./data/me.xml", "r")
# print(file_xml_reading)

tree = ET.parse(file_xml_reading)
root = tree.getroot()

# tree.getroot()
# https://scrapingant.com/blog/python-parse-xml#using-xmletreeelementtree-for-efficient-xml-parsing
for child in root:
    print(child.tag, ":", child.text)
    # TODO - fix hobbies

# TODO - change this to some kind of usable obj

print("------------- end of XML ------------------------------")

# json
print("------------- start of Json ------------------------------")

file_json_reading = open("./data/me.json", "r")
parse_json = json.loads(file_json_reading.read())
print("json", parse_json)

print("------------- end of Json ------------------------------")

# txt
print("------------- start of txt ------------------------------")

print("------------- end of txt ------------------------------")

# yaml
print("------------- start of yaml ------------------------------")
# pyyaml dead ? https://stackoverflow.com/questions/75850232/pyyaml-looks-like-is-outdated
# only give support up to YAML 1.1, but the newest version is at least 1.2 

# ruamel.yaml is giving some problems
# ruamel.yaml better?   https://pypi.org/project/ruamel.yaml/
# guide https://medium.com/towards-data-science/writing-yaml-files-with-python-a6a7fc6ed6c3

# lets make a data class - # https://yaml.dev/doc/ruamel.yaml/dumpcls/#top

# class yaml_me_data:
#     def __init__(self, name, age, hobbies):
#         self.name = name
#         self.age = age
#         self.hobbies = hobbies

# yaml = YAML()
# yaml.default_flow_style = False # is this really needed ?
# print("yaml", yaml)
# file_yaml_reading = open("./data/me.yaml", "r")

# https://python.land/data-processing/python-yaml#:~:text=The%20most%20used%20python%20YAML,you%20to%20work%20with%20JSON.

file_yaml_reading = open("./data/me.yaml", "r")
result = yaml.safe_load(file_yaml_reading.read())
print("yaml", result)
print("yaml hobbies", result["hobbies"])


print("------------- end of yaml ------------------------------")

# csv 
print("------------- start of csv ------------------------------")
# https://www.digitalocean.com/community/tutorials/parse-csv-files-in-python

with open('./data/me.csv', 'r') as csv_file: 
    reader = csv.reader(csv_file)

    for row in reader:
        print(row)
    csv_file.close()

    # TODO - handle this a obj
    # this looks like ass, fix it

print("------------- end of csv ------------------------------")