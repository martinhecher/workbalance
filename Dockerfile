FROM artificial/docker-sails:stable-pm2

COPY ./server /server
COPY ./client /client

RUN npm install -g sails

WORKDIR /server
RUN npm install

# Builds the app and copies it over to be included with Sails:
WORKDIR /client
RUN bower install --allow-root
RUN npm install
RUN npm install sails ember

# FIXXME: there seems to be a bug causing '/server' to be immutable. The 'ember build'
# command below is working, but there are no files persisted int eh output-path if the
# path is located within 'server.'
#RUN ember build --environment=production --output-path=/server/assets/

# This is a workaround for the problem that sets up the node server in /tmp and starts
# it from there:
RUN cp -r /server/* /tmp
RUN ./node_modules/ember-cli/bin/ember build --environment=production --output-path=/tmp/assets/
RUN ls -alh /tmp

# Starts sails in production mode on port 80:
WORKDIR /tmp
CMD PORT=80 node app.js

# FIXXME: following line is not starting the server for some reason...
# CMD pm2 start app.js -- --prod

EXPOSE 80
