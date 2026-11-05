#!/bin/sh
# Creates one database and one user per service (C3). Each user owns only its own database.
# Postgres runs this once, when its data volume is empty.
set -eu

create() {
  name="$1"
  password="$2"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres \
    -v name="$name" -v password="$password" <<'SQL'
CREATE USER :"name" WITH PASSWORD :'password';
CREATE DATABASE :"name" OWNER :"name";
REVOKE ALL ON DATABASE :"name" FROM PUBLIC;
SQL
}

create identity "$IDENTITY_DB_PASSWORD"
create curriculum "$CURRICULUM_DB_PASSWORD"
create glossary "$GLOSSARY_DB_PASSWORD"
create site "$SITE_DB_PASSWORD"
create notification "$NOTIFICATION_DB_PASSWORD"
