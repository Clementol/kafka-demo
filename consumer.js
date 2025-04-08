import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'employee-service',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'employee-group' })

await consumer.subscribe({ topic: 'employee-topic', fromBeginning: false });

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            offset: message.offset,
            // key: message.key.toString(),
            value: message.value.toString()
        })
    }
})