import { createClient } from "redis";

export const redis = createClient({
    url: "redis://localhost:6379"
})

redis.on("error", (err) => console.log(err));

const connect = async () => {
    await redis.connect();
}
connect()