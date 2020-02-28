import { Prisma } from 'prisma-binding';
import * as faker from 'faker';

const fName = faker.name.findName();
const fMail = fName + '@pm.me';
const fZip: string = faker.address.zipCode();
const fText = faker.random.words();
const fTitle = faker.random.word();
const fLocation = faker.address.streetAddress();

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4455'
});

const userCreateTweetThenListTweets = async (
  uID: string | number,
  data: any
) => {
  const test1 = await prisma.mutation.createTweet(
    {
      data
    },
    '{ id title text createdAt }'
  );
  // const test1 = await prisma.mutation.createTweet(
  //   {
  //     data: {
  //       title: fTitle,
  //       text: fText,
  //       published: true,
  //       owner: { connect: { id: uID } }
  //     }
  //   },
  //   '{ id title text }'
  // );

  const queryUser = await prisma.query
    .user(
      { where: { id: uID } },
      '{ id name tweets { title text location createdAt }}'
    )
    .then(data => {
      console.log(`user tweets: ${JSON.stringify(data, undefined, 2)}`);
    });

  return queryUser;
};

const targetUser = 'ck6xtwcn9004m0722gqr1l41w';
const commentCreatorID = '';
// userCreateTweetThenListTweets(targetUser, {
//   text: fText,
//   title: fTitle,
//   published: true,
//   location: fLocation,
//   owner: { connect: { id: targetUser } }
// }).catch(error => {
//   console.log(`error3: ${JSON.stringify(error, undefined, 2)}`);
// });

const commentForTargetTweetID = 'ck6ygb02j01og0722rpvyuh7s';
const createComments = async (
  commentCreatorID: string | number,
  targetTweetID: string | number
) => {
  const createComments = await prisma.mutation
    .createComment(
      {
        data: {
          text: fText,
          author: { connect: { id: commentCreatorID } },
          tweet: { connect: { id: targetTweetID } }
        }
      },
      '{ id text tweet { id title } }'
    )
    .then(rtComments => {
      console.log(
        `new comments for one tweet: ${JSON.stringify(
          rtComments,
          undefined,
          2
        )}`
      );
    })
    .catch(error => {
      console.log(`error comments: ${JSON.stringify(error, undefined, 2)}`);
    });

  return createComments;
};
// createComments('ck6xtv20d004h0722yz0pa5gp', commentForTargetTweetID);

const createUser = async () => {
  const user = await prisma.mutation
    .createUser(
      { data: { name: fName, email: fMail } },
      '{ id name email country createdAt tweets { title text } }'
    )
    .then(data => {
      console.log(`new user info: ${JSON.stringify(data, undefined, 2)}`);
    })
    .catch(error => {
      console.log(`error2: ${JSON.stringify(error, undefined, 2)}`);
    });

  return user;
};

// createUser();
