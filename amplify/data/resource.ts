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
      auditorias: a.hasMany("ActivoAuditoria", "activoId"),
      numeroSerie: a.string(),
    })
    .secondaryIndexes((index) => [index("salaId"), index("tipoId")])
    .authorization((allow) => [allow.authenticated()]),

  Tipo: a
    .model({
      nombre: a.string(),
      activos: a.hasMany("Activo", "tipoId"),
      icono: a.string(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["read", "create", "update", "delete"]),
    ]),

  ActivoSala: a
    .model({
      activoId: a.id().required(),
      salaId: a.id().required(),
      activo: a.belongsTo("Activo", "activoId"),
      sala: a.belongsTo("Sala", "salaId"),
    })
    .authorization((allow) => [allow.authenticated()]),

  Sala: a
    .model({
      nombre: a.string(),
      historicoActivos: a.hasMany("ActivoSala", "salaId"),
      activos: a.hasMany("Activo", "salaId"),
      auditorias: a.hasMany("Auditoria", "salaId"),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["read", "create", "update", "delete"]),
    ]),
  Auditoria: a
    .model({
      salaId: a.id().required(),
      cerrada: a.boolean(),
      tipos: a.string().array(),
      activos: a.hasMany("ActivoAuditoria", "auditoriaId"),
      sala: a.belongsTo("Sala", "salaId"),
    })
    .secondaryIndexes((index) => [index("salaId")])
    .authorization((allow) => [allow.authenticated()]),

  ActivoAuditoria: a
    .model({
      activoId: a.id().required(),
      auditoriaId: a.id().required(),
      activo: a.belongsTo("Activo", "activoId"),
      auditoria: a.belongsTo("Auditoria", "auditoriaId"),
    })
    .identifier(["activoId", "auditoriaId"])
    .secondaryIndexes((index) => [index("auditoriaId")])
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
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
