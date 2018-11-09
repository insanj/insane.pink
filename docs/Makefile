
.PHONY: all
all: jekyll gcloud

jekyll:
	rm -r -f docs
	rm -r -f _site
	bundle exec jekyll build --destination docs

gcloud:
	gcloud app deploy

serve:
	bundle exec jekyll serve --watch