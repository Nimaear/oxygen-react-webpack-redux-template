import ObjectId from 'bson-objectid';

export default ObjectId;

// const localStorage = localStorage || {};

// let _increment = Math.floor(Math.random() * (16777216));
// const _pid = Math.floor(Math.random() * (65536));
// let _machine = Math.floor(Math.random() * (16777216));

// const mongoMachineId = parseInt(localStorage.mongoMachineId, 10);
// if (mongoMachineId >= 0 && mongoMachineId <= 16777215) {
//   _machine = Math.floor(localStorage.mongoMachineId);
// }
// // Just always stick the value in.
// localStorage.mongoMachineId = _machine;

// class ObjectId {
//   constructor() {
//     if (!(this instanceof ObjectId)) {
//       return new ObjectId(arguments[0], arguments[1], arguments[2], arguments[3]).toString();
//     }

//     if (typeof (arguments[0]) === 'object') {
//       this.timestamp = arguments[0].timestamp;
//       this.machine = arguments[0].machine;
//       this.pid = arguments[0].pid;
//       this.increment = arguments[0].increment;
//     } else if (typeof (arguments[0]) === 'string' && arguments[0].length === 24) {
//       this.timestamp = Number('0x' + arguments[0].substr(0, 8));
//       this.machine = Number('0x' + arguments[0].substr(8, 6));
//       this.pid = Number('0x' + arguments[0].substr(14, 4));
//       this.increment = Number('0x' + arguments[0].substr(18, 6));
//     } else if (arguments.length === 4 && arguments[0] !== null) {
//       this.timestamp = arguments[0];
//       this.machine = arguments[1];
//       this.pid = arguments[2];
//       this.increment = arguments[3];
//     } else {
//       this.timestamp = Math.floor(new Date().valueOf() / 1000);
//       this.machine = _machine;
//       this.pid = _pid;
//       this.increment = _increment++;
//       if (_increment > 0xffffff) {
//         _increment = 0;
//       }
//     }
//   }

//   getDate() {
//     return new Date(this.timestamp * 1000);
//   }

//   toArray() {
//     const strOid = this.toString();
//     const array = [];
//     for (let i = 0; i < 12; i++) {
//       array[i] = parseInt(strOid.slice(i * 2, i * 2 + 2), 16);
//     }
//     return array;
//   }

//   toString() {
//     if (this.timestamp === undefined
//       || this.machine === undefined
//       || this.pid === undefined
//       || this.increment === undefined) {
//       return 'Invalid ObjectId';
//     }

//     const timestamp = this.timestamp.toString(16);
//     const machine = this.machine.toString(16);
//     const pid = this.pid.toString(16);
//     const increment = this.increment.toString(16);
//     return '00000000'.substr(0, 8 - timestamp.length) + timestamp +
//          '000000'.substr(0, 6 - machine.length) + machine +
//          '0000'.substr(0, 4 - pid.length) + pid +
//          '000000'.substr(0, 6 - increment.length) + increment;
//   }
// }

// export default ObjectId;
