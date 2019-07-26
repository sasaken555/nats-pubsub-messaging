#!/bin/bash

# Create Service Account
ACCOUNT_NAME="dev-machine"
ACCOUNT_EMAIL="${ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
gcloud iam sevice-account create $ACCOUNT_NAME
gcloud iam sevice-account update $ACCOUNT_EMAIL --display-name "Development machine service account"

# Add permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member "serviceAccount:${ACCOUNT_EMAIL}" \
  --role "roles/pubsub.editor"

# Get Creadential to connect from local machine
gcloud iam service-accounts keys create gcloud_credential.json --iam-account $ACCOUNT_EMAIL
