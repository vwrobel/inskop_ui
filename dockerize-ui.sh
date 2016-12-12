#!/usr/bin/env bash

docker build -t inskop_ui -t 939102736904.dkr.ecr.eu-west-1.amazonaws.com/inskop_ui:latest ./ui
docker build -t inskop_ui_nginx -t 939102736904.dkr.ecr.eu-west-1.amazonaws.com/inskop_ui_nginx:latest ./nginx
