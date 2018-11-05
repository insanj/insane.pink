# NODEJS
FROM gcr.io/google_appengine/nodejs
COPY . /app/
RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)

# RUBY
FROM gcr.io/google_appengine/ruby
COPY . /app/
RUN bundle install

RUN bundle exec jekyll serve
