import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
const schema = a.schema({
  Activo: a
    .model({
      nombre: a.string(),
      tipoId: a.id(),
      salaId: a.id(),
      sala: a.belongsTo("Sala", "salaId"),
      tipo: a.belongsTo("Tipo", "tipoId"),
      salas: a.hasMany("ActivoSala", "activoId"),
    })
    .authorization((allow) => [allow.guest()]),

  Tipo: a
    .model({
      nombre: a.string(),
      activos: a.hasMany("Activo", "tipoId"),
    })
    .authorization((allow) => [allow.guest()]),

  ActivoSala: a
    .model({
      activoId: a.id().required(),
      salaId: a.id().required(),
      activo: a.belongsTo("Activo", "activoId"),
      sala: a.belongsTo("Sala", "salaId"),
    })
    .authorization((allow) => [allow.guest()]),

  Sala: a
    .model({
      nombre: a.string(),
      historicoActivos: a.hasMany("ActivoSala", "salaId"),
      activos: a.hasMany("Activo", "salaId"),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
