# Migration `20201022115604-init`

This migration has been generated by kathancox at 10/22/2020, 7:56:04 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"id" SERIAL,
"title" text   NOT NULL ,
"content" text   ,
"published" boolean   NOT NULL DEFAULT false,
PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201022115604-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int     @default(autoincrement()) @id
+  title     String
+  content   String?
+  published Boolean @default(false)
+}
```


