class Student {
    constructor(name, grades) {
        this.name = name;
        this.grades = grades; // (0-20 scale)
    }

    calculateFinalGrade() {
        if (this.grades.length === 0) return 0;
        const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
        return (sum / this.grades.length).toFixed(2);
    }

    displayInfo() {
        console.log(`Student: ${this.name}`);
        console.log(`Grades: ${this.grades.join(", ")}`);
        console.log(`Final Grade: ${this.calculateFinalGrade()}`);
    }
}

// Example usage:
const student1 = new Student("Janice", [18, 16, 20, 19, 17]);
const student2 = new Student("Daniel", [12, 14, 10, 15, 13]);
const student3 = new Student("Alex", [9, 7, 11, 6, 8]);
const student4 = new Student("Trudy", [10, 11, 12, 13, 11]);

student1.displayInfo();
student2.displayInfo();
student3.displayInfo();
student4.displayInfo();