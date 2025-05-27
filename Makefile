# ===============================
# Variables (adapte au besoin)
# ===============================
include .env

DB_CONTAINER = flowee-db
BACKEND_CONTAINER = flowee-backend
MIGRATION_PATH = src/migration/
DATASOURCE_PATH = src/dataSource/dataSource.ts
SEED_SCRIPT = src/scripts/seedAdmin.ts
CONTAINER = flowee-db
DB_SUPERUSER = postgres
DB_NAME = flowee
OS := $(shell uname)

# ===============================
# Règles
# ===============================
.PHONY: default
default: dev

# Copie du fichier .env si manquant
.PHONY: env
env:
	@if [ ! -f .env ]; then \
		echo "📦 Copie de .env.example vers .env..."; \
		cp .env.example .env; \
	else \
		echo ".env déjà présent. ✅"; \
	fi


.PHONY: init-db-user
init-db-user:
	npx ts-node backend/src/scripts/init_db_user.ts


# Mode développement
.PHONY: run
run:
	sh ./run.sh

# Mode production/staging
.PHONY: prod
prod:
	docker-compose -f docker-compose.prod.yml up --build -d

# Stop containers
.PHONY: stop
stop:
	docker-compose -f docker-compose.dev.yml down

# Restart dev
.PHONY: restart
restart:
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.dev.yml up --build

# ===============================
# Migrations
# ===============================
# Generate a migration automatically from the modified entities
.PHONY: migration-generate
migration-generate:
	@read -p "Nom de la migration : " name; \
	TIMESTAMP=$$(date +%s); \
	docker exec -it $(BACKEND_CONTAINER) \
	npx typeorm-ts-node-commonjs migration:generate $(MIGRATION_PATH)/$$TIMESTAMP-$$name -d $(DATASOURCE_PATH); \
	echo "✅ Migration générée : $$TIMESTAMP-$$name.ts"

# Create an empty migration manually (skeleton)
.PHONY: migration-create
migration-create:
	@read -p "Nom de la migration : " name; \
	TIMESTAMP=$$(date +%s); \
	docker exec -it $(BACKEND_CONTAINER) \
	npx typeorm-ts-node-commonjs migration:create $(MIGRATION_PATH)/$$TIMESTAMP-$$name

# Run the migrations on the database
.PHONY: migrations
migrations:
	docker exec -it $(BACKEND_CONTAINER) \
	npx typeorm-ts-node-commonjs migration:run -d src/dataSource/dataSource.ts

# Revert to the previous state (rollback)
.PHONY: migration-revert
migration-revert:
	docker exec -it $(BACKEND_CONTAINER) \
	npx typeorm-ts-node-commonjs migration:revert -d $(DATASOURCE_PATH)

# ===============================
# Seed
# ===============================
.PHONY: seed
seed: check-backend
	docker exec -it $(BACKEND_CONTAINER) npx ts-node $(SEED_SCRIPT)

# ===============================
# Postgres
# ===============================
.PHONY: psql
psql:
	docker exec -it flowee-db psql -U $$POSTGRES_USER

.PHONY: reset-db
reset-db:
	docker exec -i $(DB_CONTAINER) \
	psql -U $(POSTGRES_USER) -d $(POSTGRES_DB) \
	-c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"


# ===============================
# Logs et Debug
# ===============================
.PHONY: logs
logs:
	docker-compose -f docker-compose.dev.yml logs -f

.PHONY: bash
bash:
	docker exec -it $(BACKEND_CONTAINER) sh

# ===============================
# Vérification conteneur
# ===============================
.PHONY: check-backend
check-backend:
	@if ! docker ps --filter "name=$(BACKEND_CONTAINER)" --filter "status=running" | grep $(BACKEND_CONTAINER) > /dev/null; then \
		echo "❌ Le conteneur $(BACKEND_CONTAINER) n’est pas en ligne."; \
		exit 1; \
	fi

# ===============================
# Premier lancement dev
# ===============================
.PHONY: first-launch
first-launch: env run


# ===============================
# Test
# ===============================
.PHONY: test
test:
	docker exec -it flowee-backend sh -c "echo 'Contenu de /app:' && ls -al /app && \
	echo '\nContenu de /app/src:' && ls -al /app/src || echo '/app/src non trouvé'"
	
