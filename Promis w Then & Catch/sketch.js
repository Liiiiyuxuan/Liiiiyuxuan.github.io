// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
// }



////////// a small introduction of how promise works //////////
// let p = new Promise((resolve, reject) => {
//   let a = 1 + 1;
//   if (a === 3) {
//     resolve('Success');
//   } else {
//     reject('Failure');
//   }
// })

// p.then((message) => {
//   console.log('This is in then' + ` ${message}`);
// }).catch((message) => {
//   console.log('This is in catch' + ` ${message}`);
// })



////////// a complicated function and its promise version //////////
// const USERLEFT = true;
// const USERWATCHINGCATMEME = true;

// // function watchTutorialCallback(callback, errorCallback) {
// //   if (USERLEFT) {
// //     errorCallback({
// //       name: 'User Left',
// //       message: ':('
// //     });
// //   } else if (USERWATCHINGCATMEME) {
// //     errorCallback({
// //       name: 'User Watching Cat Meme,',
// //       message: 'Tutorial < Cat Meme'
// //     });
// //   } else {
// //     callback('Great Job and Keep Going');
// //   }
// // }

// // watchTutorialCallback((message) => {
// //   console.log('Success: ' + message)
// // }, (error) => {
// //   console.log(error.name + ' ' + error.message)
// // })

// function watchTutorialPromise() {
//   return new Promise((resolve, reject) => {
//     if (USERLEFT) {
//       reject({
//         name: 'User Left',
//         message: ':('
//       });
//     } else if (USERWATCHINGCATMEME) {
//       reject({
//         name: 'User Watching Cat Meme,',
//         message: 'Tutorial < Cat Meme'
//       });
//     } else {
//       resolve('Great Job and Keep Going');
//     }
//   })
// }

// watchTutorialPromise().then((message) => {
//   console.log('Success: ' + message)
// }).catch((error) => {
//   console.log(error.name + ' ' + error.message)
// })



////////// run several promises //////////
const EVENTONE = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a === 2) {
    resolve('number 1 true');
  } else {
    reject('number 1 false');
  }
})

const EVENTTWO = new Promise((resolve, reject) => {
  let b = 2 + 2;
  if (b === 4) {
    resolve('number 2 true');
  } else {
    reject('number 2 false');
  }
})

const EVENTTHREE = new Promise((resolve, reject) => {
  let c = 3 + 3;
  if (c === 6) {
    resolve('number 3 true');
  } else {
    reject('number 3 false');
  }
})

// Promise.race([
//   EVENTONE,
//   EVENTTWO,
//   EVENTTHREE,
// ]).then((message) => {
//   console.log(message);
// })

Promise.all([
  EVENTONE,
  EVENTTWO,
  EVENTTHREE,
]).then((message) => {
  console.log(message);
}).catch((message) => {
  console.log(message);
})