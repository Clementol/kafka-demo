import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'employee-service',
    brokers: ['localhost:9092']
});

const producer = kafka.producer()

const publish = async () => {
    await producer
        .connect()
        .catch((e) => console.error(`error on connecting to kafka`, e))

    for (let i =0; i<15; i++) {
        await producer.send({
            topic: 'employee-topic',
            messages: [
                { value: JSON.stringify({ empName: 'Nairobi ' + i})} //key: "emp001"
            ]
        })
    }
}
publish().catch((e) => console.error(e))