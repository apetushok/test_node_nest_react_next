install:
	docker-compose up -d
	docker-compose exec -T backend bash -c 'npm run seed:users'