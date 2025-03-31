
class Person {
    constructor(nameInput, ageInput, hobbiesInput) {
        this.name = nameInput;
        this.age = ageInput;
        this.hobbies = hobbiesInput;
    }

    displayPerson() {
        console.log(`name: ${this.name} , age: ${this.age} , hobbies: ${this.hobbies.toString()}`);
    }
}

export default Person;