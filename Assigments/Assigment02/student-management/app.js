import promptSync from 'prompt-sync';
const prompt = promptSync();

function getrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getStudents() {
    const students = [];

    for (let i = 1; i <= 5; i++) {
        const name = prompt(`Enter the name of student ${i}: `);
        const gender = prompt(`Enter the gender of student ${i}: `);
        const age = getrandom(17, 35);
        const grade = getrandom(0, 100);

        students.push({ name, gender, age, grade });
    }

    return students;
}

const students = getStudents();

const displayStudents = (students) => {
    students.forEach(student => {
        console.log(`Name: ${student.name}, Gender: ${student.gender}, Age: ${student.age}, Grade: ${student.grade}`);
    });
};

const getYoungest = students => students.reduce((youngest, student) => student.age < youngest.age ? student : youngest);

const getOldest = students => students.reduce((oldest, student) => student.age > oldest.age ? student : oldest);

const getAvgAge = students => students.reduce((sum, student) => sum + student.age, 0) / students.length;

const getMedAge = students => {
    const sortedAges = students.map(student => student.age).sort((a, b) => a - b);
    const mid = Math.floor(sortedAges.length / 2);
    return sortedAges.length % 2 !== 0 ? sortedAges[mid] : (sortedAges[mid - 1] + sortedAges[mid]) / 2;
};

const getMeanGrade = students => students.reduce((sum, student) => sum + student.grade, 0) / students.length;

const getVariance = students => {
    const mean = getMeanGrade(students);
    return students.reduce((sum, student) => sum + Math.pow(student.grade - mean, 2), 0) / (students.length - 1);
};

const getStudByGen = (students, gender) => students.filter(student => student.gender.toLowerCase() === gender.toLowerCase());

const getSortedAlph = students => students.slice().sort((a, b) => a.name.localeCompare(b.name));

const getSortedGrade = students => students.slice().sort((a, b) => b.grade - a.grade);

const isFailing = students => students.filter(student => student.grade < 60).length > 0;

const getHighestGrade = students => students.reduce((highest, student) => student.grade > highest.grade ? student : highest);

const getHighestFemale = students => getHighestGrade(getStudByGen(students, "female"));

const getAvgGrade = students => students.reduce((sum, student) => sum + student.grade, 0) / students.length;

const getAvgMale = students => getAvgGrade(getStudByGen(students, "male"));

const studentStat = student => student.grade < 60 ? "Falied" : "Passed";

const displayStudentsStatus = (students) => {
    students.forEach(student => {
        console.log(`Name: ${student.name}, Gender: ${student.gender}, Age: ${student.age}, Grade: ${student.grade}, Status: ${studentStat(student)}`);
    });
};

console.log("Youngest Student: ", getYoungest(students));

console.log("Oldest Student: ", getOldest(students));

console.log("Average Age: ", getAvgAge(students).toFixed(2));

console.log("Median Age: ", getMedAge(students).toFixed(2));

console.log("Mean Grade: ", getMeanGrade(students).toFixed(2));

console.log("Variance of Grades: ", getVariance(students).toFixed(2));

console.log("Male Students:");
displayStudents(getStudByGen(students, "male"));

console.log("Female Students:");
displayStudents(getStudByGen(students, "female"));

console.log("Students Sorted Alphabetically:");
displayStudents(getSortedAlph(students));

console.log("Students Sorted by Grade:");
displayStudents(getSortedGrade(students));

console.log("Any Failing Students: ", isFailing(students) ? "Yes" : "No");

const highest = getHighestGrade(students);
console.log(`Highest Grade: ${highest.name}, ${highest.grade}`);

const highestFemale = getHighestFemale(students);
console.log(`Highest Female Grade: ${highestFemale.name}, ${highestFemale.grade}`);

console.log("Average Male Grade: ", getAvgMale(students).toFixed(2));

console.log("Students Status:");
displayStudentsStatus(students);

