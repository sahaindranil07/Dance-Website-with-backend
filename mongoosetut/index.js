const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/kat');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const kitty = new mongoose.Schema({
  name: String
});
kitty.methods.speak = function speak() {
  const greeting = "name is "+this.name
  console.log(greeting);
};
const Kitten = mongoose.model('flower', kitty);

const harrykitty = new Kitten({ name: 'malaika' });
console.log(harrykitty.name); // 'Silence'
harrykitty.speak();

harrykitty.save();

const kittens =  Kitten.find({ name: "malaika"});
console.log(kittens);


console.log(harrykitty)