#!/usr/bin/env bash

# before you begin, export kafka path
# export KAFKA_PATH=${HOME}/kafka_2.12-2.3.0
KAFKA=${KAFKA_PATH}

${KAFKA}/bin/zookeeper-server-start.sh ${KAFKA}/config/zookeeper.properties &
${KAFKA}/bin/kafka-server-start.sh ${KAFKA}/config/server.properties &
