FROM ruby:2.5.1

# Information about author
LABEL author.name="PhongVuong" \
  author.email="phong.vuong008@gmail.com"


# Install apt based dependencies required to run Rails as
# well as RubyGems. As the Ruby image itself is based on a
# Debian image, we use apt-get to install those.
RUN apt-get update && \
  apt-get install -y nodejs postgresql-client vim

# Set the timezone.
ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Configure the main working directory. This is the base
# directory used in any further RUN, COPY, and ENTRYPOINT
ENV APP_PATH /my_app
WORKDIR $APP_PATH


# Copy the Gemfile as well as the Gemfile.lock and install
# the RubyGems. This is a separate step so the dependencies
COPY Gemfile Gemfile.lock $APP_PATH/
RUN gem install bundler --no-document
RUN bundle install --no-binstubs --jobs $(nproc) --retry 3
# COPY . /myapp

COPY . .
# Add a script to be executed every time the container starts.
COPY docker/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]