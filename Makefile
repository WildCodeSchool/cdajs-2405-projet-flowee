# ===============================
# Variables (adapte au besoin)
# ===============================
include .env

DB_CONTAINER = flowee-db
BACKEND_CONTAINER = flowee-backend
MIGRATION_PATH = src/migration/
DATASOURCE_PATH = src/dataSource/dataSource.ts
SEED_SCRIPT = src/scripts/seedAdmin.ts
POSTGRES_USER = $(DB_SUPERUSER)
POSTGRES_DB = ${DB_NAME}
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


# ===============================
# Gestion utilisateurs
# ===============================

# Wait for DB to be ready 
.PHONY: wait-db
wait-db:
	@until docker exec $(DB_CONTAINER) pg_isready -U $(DB_SUPERUSER); do \
		echo "Waiting for postgres..."; \
		sleep 2; \
	done


# Création d'un utilisateur de base de données
.PHONY: init-db-user
init-db-user: wait-db
	docker exec -it $(BACKEND_CONTAINER) npx ts-node /app/src/scripts/init_db_user.ts

# Supprimer un utilisateur de base de données
.PHONY: clean-test-users
clean-test-users:
	npx ts-node backend/src/scripts/clean_test_users.ts

# ===============================
# Launch containers
# ===============================

# Launch développement
.PHONY: run dev
run-dev:
	sh ./run.sh

# Launch staging
.PHONY: run staging
run-staging:
	sh ./run-staging.sh

# Launch prod
.PHONY: run staging
run-prod:
	sh ./run-prod.sh	



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
	npx typeorm-ts-node-commonjs migration:generate $(MIGRATION_PATH)/$${TIMESTAMP}-$${name// /-} -d $(DATASOURCE_PATH); \
	echo "✅ Migration générée : $${TIMESTAMP}-$${name// /-}.ts"

# Create an empty migration manually (skeleton)
.PHONY: migration-create
migration-create:
	@read -p "Nom de la migration : " name; \
	TIMESTAMP=$$(date +%s); \
	docker exec -it $(BACKEND_CONTAINER) \
	npx typeorm-ts-node-commonjs migration:create $(MIGRATION_PATH)/$$TIMESTAMP-$$name

# Dump the database

.PHONY: backup-db
backup-db:
	docker exec -t flowee-db pg_dump -U flowee_user flowee > flowee_backup_before_uuid.sql


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

.PHONY: whoami
whoami:
	docker exec -it $(BACKEND_CONTAINER) \
	npx ts-node -e "import { dataSource } from './src/dataSource/dataSource'; dataSource.initialize().then(async () => { const result = await dataSource.query('SELECT current_user'); console.log('➡️ current_user:', result); process.exit(0); });"
