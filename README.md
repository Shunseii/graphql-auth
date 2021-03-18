# graphql-auth
A boilerplate for an Express GraphQL API that stores user data in MongoDB and implements authentication and authorization using sessions stored in Redis, all integrated with Typescript. It uses decoraters provided by Typegoose and Typegraphql together to automatically generate type definitions, mongoose models, and an SDL schema file (schema.gql) from a single source of truth.

## Front end
I included a rough, CSR, and Typescript-supported front end using Create React App, Tailwindcss (no jit yet), and Apollo Client. I used GraphQL Code Generator for automatically generating typings based off of the schema.graphql file instead of apollo codegene as I could not get the latter to work. Run npm run generate script to generate the typings. The front end template is not complete, but has the end-to-end auth flow working. In particular, the styling is abhorrant.
