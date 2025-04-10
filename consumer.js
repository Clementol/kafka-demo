import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'employee-service',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ 
    groupId: 'employee-group',
    retry: {
        initialRetryTime: 100,
        retries: 0
    }
 })

await consumer.subscribe({ topic: 'employee-topic', fromBeginning: false });

await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
        console.log({
            partition,
            offset: message.offset,
            // key: message.key.toString(),
            value: message.value.toString()
        })
        
        await new Promise((res) => setTimeout(res, 1000))
        await heartbeat()
        if (message.offset == 69) throw new Error("=>Kafka Error")
        await consumer.commitOffsets([
            { 
                topic,
                partition,
                offset: Number(message.offset).toString()
            }
        ])
    },
})