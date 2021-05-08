#!/bin/bash
eval $(minikube docker-env)

minikube -p minikube docker-env | Invoke-Expression
cd ./client/
docker build -t client:0.1 -f ./Dockerfile .
cd ..
cd ./db-service
docker build -t db-server:0.1 -f ./Dockerfile .
cd ..
cd ./server
docker build -t auth-server:0.1 -f ./Dockerfile .
cd ..

cd ./scripts/service-yamls
kubectl apply -f ./
cd ..
cd ..


cat orchids_dump.sql | kubectl exec -i postgres-84ff4497db-7f2xf -- psql -U uxbuvhokbbocan -d dbit7n0ojntpd7