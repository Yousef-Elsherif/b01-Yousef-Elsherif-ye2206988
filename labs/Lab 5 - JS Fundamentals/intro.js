// let x = 0;
// while(x <= 100) {
//     if(x % 2 != 0) {
//         console.log(x);
//     }
//     x += 1;
// }

// for(let i = 0; i <= 100; i++) {
//     if(i % 2 != 0) {
//         console.log(i);
//     }
// }/ 

const cars = ["Toyota", "Honda", "BMW"];
cars.push("Volvo");

// for(let i = 0; i < cars.length; i++) {
//     console.log(cars[i]);
// }

function display(list){
    for(let i = 0; i < list.length; i++) {
        console.log(list[i]);
    }
}
cars.unshift("Mercedes");
display(cars);
