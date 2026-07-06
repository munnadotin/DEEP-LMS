import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

async function connectRedis() {
    try {
        await redis.ping();
        console.log("Redis Connected");
    } catch (err) {
        console.log("Redis Connection Failed");
        process.exit(1);
    }
}

export { redis, connectRedis };