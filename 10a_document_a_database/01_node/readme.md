# commands to use

```bash
# postgresql
cd ./01_node

# used the other way around
# RUN npx dbml2sql postgres "postgres://admin:password@localhost:5433/rizz?schemas=public" -o schema.dbml
RUN npx db2dbml postgres "postgresql://admin:password@localhost:5433/rizz?schemas=public" -o schema.dbml

# 
```