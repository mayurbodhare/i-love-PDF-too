import Redis from "ioredis";

const resisConfig = {
	host: process.env.REDIS_HOST || "localhost",
	port: Number(process.env.REDIS_PORT) || 6379,
	maxRetriesPerRequest: null,
};

export const connection = new Redis(resisConfig);
