#!/bin/bash
export AWS_PROFILE=armiq-local
export DOCDB_PORT="${1:-3307}"
if [  "$DOCDB_PORT" -lt "-1" ]; then
    echo "No port number"
    exit 1
fi
INSTANCE_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=llama-factory-bastion-host" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].InstanceId" --output text)
DB_HOST=llama-factory-db.cdi846caqavi.us-east-2.rds.amazonaws.com

echo "Connecting to bastion host instance: $INSTANCE_ID..."
echo "Tunneling localhost:$DOCDB_PORT to $DB_HOST:3306..."
aws ssm start-session --region us-east-2 --document-name AWS-StartPortForwardingSessionToRemoteHost --parameters host="$DB_HOST",portNumber="3306",localPortNumber="$DOCDB_PORT" --target $INSTANCE_ID