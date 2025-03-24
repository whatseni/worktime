import _mongoose, { connect } from "mongoose";

const TEST_URI = process.env.TESTDB_URI;

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

if (!TEST_URI) {
  throw new Error("DB 접속 URI 확인 바람.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("캐싱된 커넥션 사용");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(TEST_URI!, opts)
      .then((mongoose) => {
        console.log("DB 커넥션 생성");
        return mongoose;
      })
      .catch((error) => {
        console.log("DB 커넥션 실패");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
