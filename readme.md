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

## producer
small client that bootstraps the 

## partitions
the topic configured to have a partition per a consumer in order to have multiple consumers, if less consumers than partitions they will be distributed evently between the consumers.

this means that you will need atleast as many partitions as the maximum amount of consumers

# 