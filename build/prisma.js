"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_binding_1 = require("prisma-binding");
const faker = require("faker");
const fName = faker.name.findName();
const fMail = fName + '@pm.me';
const fZip = faker.address.zipCode();
const fText = faker.random.words();
const fTitle = faker.random.word();
const fLocation = faker.address.streetAddress();
const prisma = new prisma_binding_1.Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4455'
});
const testIfCommentExists = async (commentID) => {
    const ttComment = await prisma.exists
        .Comment({
        id: commentID,
        text: 'Club',
        author: { id: 'ck6xtwcn9004m0722gqr1l41w' }
    })
        .then(exists => {
        console.log(exists);
    });
    return ttComment;
};
// console.log(testIfCommentExists('ck768xegu07v20722elbhyj9s'));
const createTweetForUser = async (uID, data) => {
    const userExists = await prisma.exists.User({ id: uID });
    // console.log(`user exist: ${JSON.stringify(userExists)}`);
    if (!userExists) {
        throw new Error(`user ID: ${uID} NOT found.`);
    }
    const test1 = await prisma.mutation.createTweet({
        data
    }, '{ id title text createdAt }');
    const queryUser = await prisma.query.user({ where: { id: uID } }, '{ id name tweets { title text location createdAt }}');
    return queryUser;
};
const commentCreatorID = '';
const targetUser = 'ck6xtwcn9004m0722gqr1l41w--';
createTweetForUser(targetUser, {
    text: fText,
    title: fTitle,
    published: true,
    location: fLocation,
    owner: { connect: { id: targetUser } }
})
    .then(user => {
    console.log(`user : ${JSON.stringify(user, undefined, 2)}`);
})
    .catch(error => {
    // console.log(`error3: ${JSON.stringify(error, undefined, 2)}`);
    console.log(error.message);
});
const commentForTargetTweetID = 'ck6ygb02j01og0722rpvyuh7s';
const createComments = async (commentCreatorID, targetTweetID) => {
    const createComments = await prisma.mutation
        .createComment({
        data: {
            text: fText,
            author: { connect: { id: commentCreatorID } },
            tweet: { connect: { id: targetTweetID } }
        }
    }, '{ id text tweet { id title } }')
        .then(rtComments => {
        console.log(`new comments for one tweet: ${JSON.stringify(rtComments, undefined, 2)}`);
    })
        .catch(error => {
        console.log(`error comments: ${JSON.stringify(error, undefined, 2)}`);
    });
    return createComments;
};
// createComments('ck6xtv20d004h0722yz0pa5gp', commentForTargetTweetID);
const createUser = async () => {
    const user = await prisma.mutation
        .createUser({ data: { name: fName, email: fMail } }, '{ id name email country createdAt tweets { title text } }')
        .then(data => {
        console.log(`new user info: ${JSON.stringify(data, undefined, 2)}`);
    })
        .catch(error => {
        console.log(`error2: ${JSON.stringify(error, undefined, 2)}`);
    });
    return user;
};
// createUser();
//# sourceMappingURL=prisma.js.map