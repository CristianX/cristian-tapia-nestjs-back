import { KafkaConfig } from 'kafkajs';

export const kafkaConfig: KafkaConfig = {
  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
  brokers: [`${process.env.CLOUDKARAFKA_HOSTNAME}:9094`],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256' as any,
    authenticationProvider: 'PLAIN' as any,
    username: process.env.CLOUDKARAFKA_USERNAME,
    password: process.env.CLOUDKARAFKA_PASSWORD,
  },
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};
