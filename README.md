<h1 align="center">insane.pw</h1>
<h4 align="center">🎳 website for insane.jpg siege youtube videos.</h4>

| 🚀 Production Site  | 👾 Development Site |
| ------------- | ------------- |
| https://insane.pw  | https://insane.pink  |
| Google Cloud  | Github Pages |


## Table of Contents
1. [usage](#usage)
2. [setup](#setup)
3. [google cloud](#google-cloud)
4. [ruby app](#ruby-app)
5. [bucket](#bucket)
6. [github pages](#github-pages)
7. [about](#about)

![](assets/images/screenshot.jpg)

# usage

> insane.pw uses the [barber-jekyll](https://github.com/samesies/barber-jekyll#installation) theme

- install with `bundle install` ([install Bundler](https://bundler.io/)) 
- serve with `npm start` (`bundle exec jekyll serve`) to see your development site
- deploy with `npm run build` (`bundle exec jekyll build`) to build a production ready site
- sync with `npm run youtube` (`node insane_sync.js`) to create a new post from the latest insane.jpg youtube video

# setup

## Google Cloud

### 🍎 Ruby App

1. clone this repository (or create your own jekyll-based repo)
2. create a new project in the Google Cloud Console and [a new Ruby app in the App Engine section](https://console.cloud.google.com/appengine/)
3. add a new custom domain (if desired) in the [settings area](https://console.cloud.google.com/appengine/settings/domains/add?project=insanepw-220417)
4. update the advanced dns records of your domain name (which can be bought through Google, Namecheap, etc) to add the A and CNAME records, which look something like this:
```
A @ 216.239.32.21
AAAA @ 2001:4860:4802:32::15
CNAME www ghs.googlehosted.com	
```

5. install the [gcloud sdk](https://cloud.google.com/sdk/?hl=en_US) on your local machine and run `gcloud init` to setup a new configuration for the project you've just made
6. run `gcloud app deploy` which will upload and serve your files (make sure the `_config.yml` and `app.yaml` are setup to your liking). the default config looks like this:
```yaml
runtime: ruby
env: flex
entrypoint: bundle exec jekyll serve
```

> NOTE: certain config values are extremely important to hosting a jekyll server, such as the 3 listed above in the `app.yaml`, and the `excludes: [vendor]` line in the `_config.yml`, [the crux of the issue reported here](https://github.com/jekyll/jekyll/issues/5267)

### 💧 Bucket

1. clone this repository (or create your own jekyll-based repo)
2. create a new project in the Google Cloud Console and [Create a Bucket](https://console.cloud.google.com/storage/create-bucket) under the Storage section in the sidebar
3. install the [gcloud sdk](https://cloud.google.com/sdk/?hl=en_US) on your local machine and run `gcloud auth login`
4. run `jekyll build && gsutil -m rsync -d -r _site gs://<BUCKET_URL>.com`, which will upload and serve your files (make sure the `_config.yml` and `app.yaml` are setup to your liking)
5. select the bucket from the [main Bucket Browser menu](https://console.cloud.google.com/storage/browser) and change its Permissions (sometimes in the Info Panel on the right)
6. expose bucket perhaps through the [App Engine Application Settings, Default Cloud Storage Bucket](https://console.cloud.google.com/appengine/settings) area, or [using instructions here](https://little418.com/2015/07/jekyll-google-cloud-storage.html)

## Github Pages

1. clone this repository
2. either (1) trust github to properly build jekyll based on the existing `_config.yml` or (2) run `jekyll build --destination docs`
3. enable Github Pages in the settings area of your Github repository, and point it to `master` or your `docs` directory

# about

- created by [insanj](https://github.com/insanj) (Julian Weiss) 
- licensed under [GPL-3.0](LICENSE)
- [published site](https://insane.pw) copyright 2018
- reach out on [youtube](https://youtube.com/insanj)
