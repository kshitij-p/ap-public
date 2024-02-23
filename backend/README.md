PG

docker run -d \
--name postgres-me \
--mount 'type=volume,src=pgdata,dst=/var/lib/postgres/data' \
-p 5432:5432 \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=app \
 postgres:latest
