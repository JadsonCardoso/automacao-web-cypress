// support/helpers.js
const { faker } = require('@faker-js/faker');

function getRandomEmail() {
  return faker.internet.email('Qatester');
}

module.exports = {
  getRandomEmail
};
