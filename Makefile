
.PHONY: all
all: jekyll gcloud

.PHONY: jekyll
jekyll: build

gcloud:
	gcloud app deploy

start:
	bundle exec jekyll serve --watch

build: clean
	bundle exec jekyll build --destination docs

clean:
	rm -r -f docs
	rm -r -f _site

sync:
	node assets/js/insane_sync.js