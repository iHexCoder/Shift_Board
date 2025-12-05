// db connect placeholder
import { connect } from 'mongoose';

async function connectDB(uri) {
  await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
}

export default connectDB;
