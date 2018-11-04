# insane.pw

🎳 website for insane.jpg siege youtube videos. 

| 🚀 Production Site  | 👾 Development Site |
| ------------- | ------------- |
| https://insane.pw  | https://insane.pink  |
| Google Cloud  | Github Pages |

![](assets/images/screenshot.jpg)

# usage

> insane.pw uses the [barber-jekyll](https://github.com/samesies/barber-jekyll#installation) theme

- install with `bundle install` ([install Bundler](https://bundler.io/)) 
- serve with `npm start` (`bundle exec jekyll serve`) to see your development site
- deploy with `npm run build` (`bundle exec jekyll build`) to build a production ready site
- sync with `npm run youtube` (`node insane_sync.js`) to create a new post from the latest insane.jpg youtube video

# setup

## Google Cloud

1. clone this repository (or create your own jekyll-based repo)
2. create a new project in the Google Cloud Console and [Create a Bucket](https://console.cloud.google.com/storage/create-bucket) under the Storage section in the sidebar
3. install the [gcloud sdk](https://cloud.google.com/sdk/?hl=en_US) on your local machine and run `gcloud auth login`
4. run `jekyll build && gsutil -m rsync -d -r _site gs://<BUCKET_URL>.com`, which will upload and serve your files (make sure the `_config.yml` and `app.yaml` are setup to your liking)
5. select the bucket from the [main Bucket Browser menu](https://console.cloud.google.com/storage/browser) and change its Permissions (sometimes in the Info Panel on the right)

## Github Pages

1. clone this repository
2. either (1) trust github to properly build jekyll based on the existing `_config.yml` or (2) run `jekyll build --destination docs`
3. enable Github Pages in the settings area of your Github repository, and point it to `master` or your `docs` directory

# about

- created by [insanj](https://github.com/insanj) (Julian Weiss) 
- licensed under [GPL-3.0](LICENSE)
- [published site](https://insane.pw) copyright 2018
- reach out on [youtube](https://youtube.com/insanj)
