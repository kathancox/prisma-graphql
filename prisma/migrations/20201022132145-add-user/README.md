# Migration `20201022132145-add-user`

This migration has been generated by kathancox at 10/22/2020, 9:21:45 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" ADD COLUMN "authorId" integer   

CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201022115604-init..20201022132145-add-user
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,5 +14,14 @@
   id        Int     @default(autoincrement()) @id
   title     String
   content   String?
   published Boolean @default(false)
+  author    User?   @relation(fields: [authorId], references: [id])
+  authorId  Int?
 }
+
+model User {
+  id    Int    @id @default(autoincrement())
+  email String @unique
+  name  String
+  posts Post[]
+}
```


