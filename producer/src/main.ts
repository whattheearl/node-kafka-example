import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['localhost:9092']
});

const admin = kafka.admin()
const producer = kafka.producer();
const topicName = 'test-topic';

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const recreateTopic = async (topic: string, numPartitions: number) => {
  await admin.connect()
  let topics = await admin.listTopics();
  if (topics.includes(topic))
    await admin.deleteTopics({topics: [topic]})

  topics = await admin.listTopics();
  await admin.createTopics({
    waitForLeaders: true,
    topics: [{
      topic,
      numPartitions,
    }],
  })
  topics = await admin.listTopics();
  await admin.disconnect()
}

const run = async () => {
  await recreateTopic(topicName, 6);
  await producer.connect()
  while(true) {
    await sleep(1000);
    await producer.send({
      topic: topicName,
      messages: [
        { value: `${Date.now()} Hello KafkaJS user!` },
      ],
    })
  }
}

run().catch(console.error)


