import { Prisma } from 'prisma-binding';
import * as faker from 'faker';

const fName = faker.name.findName();
const fMail = fName + '@pm.me';
const fZip: string = faker.address.zipCode();
const fText = faker.random.words();
const fTitle = faker.random.word();

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4455'
});

const userCreateTweetAndListTweets = async (
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

  const test2 = await prisma.query
    .user({ where: { id: uID } }, '{ id name tweets { title text createdAt }}')
    .then(data => {
      console.log(`user tweets: ${JSON.stringify(data, undefined, 2)}`);
    });

  return test2;
};

userCreateTweetAndListTweets('ck6xsqqwj002w0722ianjrz72', {
  text: fText,
  title: fTitle,
  published: true,
  owner: { connect: { id: 'ck6xsqqwj002w0722ianjrz72' } }
}).catch(error => {
  console.log(`error3: ${JSON.stringify(error, undefined, 2)}`);
});

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
