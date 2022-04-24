# kafka node integration
small test to demo ability to use kafka as a message broker between two node apps

## getting started
```bash
# start up kafka / zookeeper
docker-compose up -d
# start producer
cd producer
npm start
# start consumers
cd ../consumer1
npm start
cd ../consumer2
npm start
cd ../consumer3
npm start
```

## kafka
This message broker is used for asynchronous communication between the producer and consumer. The consumers listen to the producers through a pub sub to a topic (key).

### topics
this is key value used to create a channel for publishers to publish messages, and subscribers to listen to published messages on.

### partitions
the topic configured to have a partition per a consumer in order to have multiple consumers, if less consumers than partitions they will be distributed evently between the consumers.

this means that you will need atleast as many partitions as the maximum amount of consumers

## producer
This client bootstraps the the topic with 6 partitions, and then publishes one message every second.

## consumers (1, 2, 3)
These clients print out the message sent by the producer.

## todos

### ACL
- can you control what messages can be written
- topics read and write?
- controlled through groupId, clientId?