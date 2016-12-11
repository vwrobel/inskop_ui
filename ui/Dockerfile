FROM phusion/baseimage

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

# ...put your own build instructions here...
#MAINTAINER Valérian Wrobel <valerian.wrobel1@gmail.com>

FROM node:6.6.0
RUN npm install webpack -g
COPY package.json/ /var/www/scopethis/package.json
RUN cd /var/www/scopethis/ && npm install

WORKDIR /var/www/scopethis
COPY ./ /var/www/scopethis
ENV NODE_ENV production
EXPOSE 8000
CMD ["npm", "run", "buildandstart"]

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*




