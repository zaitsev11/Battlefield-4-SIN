.PHONY: install run clean

install:
	pip install -r api/requirements.txt
	cd web && npm install

run:
	docker-compose up

clean:
	docker-compose down
	rm -rf api/__pycache__
