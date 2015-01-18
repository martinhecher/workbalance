FROM artificial/docker-sails:stable-pm2

COPY ./server /server
COPY ./client /client

# Builds the app and copies it over to be included with Sails:
WORKDIR /client
RUN bower install --allow-root
RUN npm install

# FIXXME: there seems to be a bug causing '/server' to be immutable. The 'ember build'
# command below is working, but there are no files persisted int eh output-path if the
# path is located within 'server.'
#RUN ember build --environment=production --output-path=/server/assets/

# This is a workaround for the problem that sets up the node server in /tmp and starts
# it from there:
RUN cp -r /server/* /tmp
RUN ./node_modules/ember-cli/bin/ember build --environment=production --output-path=/tmp/assets/

# FIXXME: following line is not starting the server for some reason...
# CMD pm2 start app.js -- --prod

# Starts sails in production mode on port 80:
WORKDIR /tmp
RUN npm install
CMD PORT=80 node app.js

EXPOSE 80
