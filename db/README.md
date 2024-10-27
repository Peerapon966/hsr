# Start the seeder container

```
cd ~/project/hsr/db
docker compose run --rm -it --name seeder seeder bash
```

# If the database is hosted in another docker container in the same machine, create a network to bridge between 2 containers. Otherwise, skip this code block

```
docker network create temp
docker network connect temp seeder
docker network connect temp mysql
```

# Create database and tables

```
mysql -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -D $DB_DATABASE -p$DB_PASSWORD -e "$(cat sql/create_tables.sql)"
mysql -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -D $DB_DATABASE -p$DB_PASSWORD -e "SHOW TABLES;"
```

# Run seeders to populate data to the database

```
npx tsx seeder/BaseSeeder.ts
npx tsx seeder/NewsSeeder.ts
```

```
exit
```

# Clean up network resources

```
docker network disconnect temp mysql
docker network rm temp
```
