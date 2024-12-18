#!/bin/bash
export AWS_PROFILE=armiq-local
export REGION=ap-northeast-2
export EC2_NAME=DEV-BASTION-HOST

export DOCDB_PORT="${1:-3307}"
if [  "$DOCDB_PORT" -lt "-1" ]; then
    echo "No port number"
    exit 1
fi
INSTANCE_ID=$(aws ec2 describe-instances --region $REGION --filter "Name=tag:Name,Values=$EC2_NAME" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].InstanceId" --output text)
DB_HOST=$(aws rds describe-db-instances --region $REGION --db-instance-identifier llama-factory-db --query "DBInstances[0].Endpoint.Address" --output text)

echo "Connecting to bastion host instance: $INSTANCE_ID..."
echo "Tunneling localhost:$DOCDB_PORT to $DB_HOST:3306..."
aws ssm start-session --region $REGION --document-name AWS-StartPortForwardingSessionToRemoteHost --parameters host="$DB_HOST",portNumber="3306",localPortNumber="$DOCDB_PORT" --target $INSTANCE_ID