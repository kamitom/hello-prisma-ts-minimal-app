"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_binding_1 = require("prisma-binding");
const faker = require("faker");
const fName = faker.name.findName();
const fMail = fName + '@pm.me';
const fZip = faker.address.zipCode();
const fText = faker.random.words();
const fTitle = faker.random.word();
const prisma = new prisma_binding_1.Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4455'
});
const createUser = async () => {
    const user = await prisma.mutation
        .createUser({ data: { name: fName, email: fMail } }, '{ id name email country createdAt tweets { title text } }')
        .then(data => {
        console.log(`user: ${JSON.stringify(data, undefined, 2)}`);
    })
        .catch(error => {
        console.log(`error2: ${JSON.stringify(error, undefined, 2)}`);
    });
    return user;
};
createUser();
// prisma.mutation
//   .createUser(
//     { data: { name: fName, email: fMail } },
//     '{ id name email country createdAt tweets { title text } }'
//   )
//   .then(data => {
//     console.log(`new user: ${JSON.stringify(data, undefined, 2)}`);
//   })
//   .catch(error => {
//     console.log(`error: ${error}`);
//   });
//# sourceMappingURL=prisma.js.map