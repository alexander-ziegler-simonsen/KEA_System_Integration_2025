
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

