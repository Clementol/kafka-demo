# Kafka Demo PRO

**If your application is not running on docker(external client), kafka needs to be downloaded for your application to connect to it.**

### Steps to download kafka:
1. Download and install Java verson 17+. Follow the link to install java on your OS. https://www.oracle.com/java/technologies/downloads/#java21

2. Download kafka using this link https://www.apache.org/dyn/closer.cgi?path=/kafka/4.0.0/kafka_2.13-4.0.0.tgz

3. Extract the kafka zip folder

### Start the Kafka environment:

1. Navigate to bin in the extracted kafka folder `~/kafka_2.13-4.0.0/bin`

2. Generate a Cluster UUID and assign to KAFKA_CLUSTER_ID with the following command - `KAFKA_CLUSTER_ID="$(./kafka-storage.sh random-uuid)"`

3. Format Log Directories with the following command -  `./kafka-storage.sh format --standalone -t $KAFKA_CLUSTER_ID -c ../config/server.properties`

4. Start the Kafka Server with the command -

    ```sh
    bin/kafka-server-start.sh config/server.properties
    ```

5. Open another terminal and navigate to the same kafka `bin` folder. Then run the following commands to create kafka topi named `employee-topic` with `1 replica and 3 partitions`

    ```
    ./kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 --topic employee-topic
    ```

6. To see list of kafka topics, run `./kafka-topics.sh --bootstrap-server localhost:9092 --list`

7. Run the consumer file in 3 seperate terminals in your vs-code or any other code editor : `node consumer.js`

8. Run the producer file in a seperate terminal and see how the messages is being distributed to the 3 partitions(3 consumers terminal)
