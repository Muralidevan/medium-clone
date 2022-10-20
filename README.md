This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


$ npm install -g @sanity/cli

(inside root folder of medium)
sanity init

touch tsconfig.json(to add typescript to existing project)

yarn add --dev typescript @types/react @types/node


declare module '*.scss';
declare module '*.css';

#typescript
typings.d.ts for exporting interfaces, interfaces are better since we can extend them


#sanity
sanity login
sanity start
https://www.sanity.io/docs/query-cheat-sheet

#sanity connect
touch sanity.js
yarn add next-sanity

next-sanity for sanity.js under lib folder for api

add .env.local with next_project_id and dataset

to add fields in sanity we can add it under schemas
ex: {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
 here author reference to author.js
     {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
    

Groq
Use sanity vision for groq query

ex:
*[_type == "post"]{
  _id,
  title,
  slug,
  author -> {
  name,
image
},
description
}

div>p*3 

ISR => Incremental static site generation

