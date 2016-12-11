#!/usr/bin/env bash

docker build -t scopethis_ui -t 939102736904.dkr.ecr.eu-west-1.amazonaws.com/scopethis_ui:latest ./ui
docker build -t scopethis_ui_nginx -t 939102736904.dkr.ecr.eu-west-1.amazonaws.com/scopethis_ui_nginx:latest ./nginx
