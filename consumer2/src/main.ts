import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'consumer2',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' })

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      console.log('sleeping', new Date());
      await sleep(1000);
      console.log('2', {
        partition,
        offset: message?.offset,
        value: message?.value?.toString(),
      })
    },
  })
}

run().catch(console.error)


