class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} makes a noise.`;
    }

    static info() {
        return "I am an animal class.";
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
  
    speak() {
        return `${super.speak()} ${this.name} barks!`;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }

    speak() {
        return "Meow!";
    }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex makes a noise. Rex barks!"

const cat = new Cat("Whiskers");
console.log(cat.speak()); // "Meow!"
  
console.log(Animal.info()); // "I am an animal class."