const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rxk9232:U2NHRuDFOvsk1Zzn@cluster1.9oot8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client.db("users").collection("sample_mflix");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}


//   create user
async function createUser(email, password) {
  const users = await connectToMongo();

  try {
    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return "User already exists";
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the collection
    const result = await users.insertOne({ email, password: password });
    console.log("User created:", result.insertedId);
    return "User created successfully";
  } catch (error) {
    console.error("Error creating user:", error);
    return "Failed to create user";
  }
}


// Update Password (for an existing user)
async function updatePassword(email, newPassword) {
  const users = await connectToMongo();

  try {
    // Hash the new password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password

    const user = await users.findOne({ email });
    if (newPassword == user.password) {
      return "new Password is same as previous Password";
    }
    const result = await users.updateOne(
      { email },
      { $set: { password: newPassword } }
    );

    if (result.modifiedCount === 1) {
      console.log("Password updated successfully");
      return "Password updated successfully";
    } else {
      console.log("User not found");
      return "User not found";
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return "Failed to update password";
  }
}

// Validate User (login)
async function validateUser(email, password) {
  const users = await connectToMongo();
  console.log("HI")

  try {
    // Find the user by email
    const user = await users.findOne({ email });
    if (!user) {
      console.log("User not found");
      return "User not found";
    }

    // Compare the password with the stored hashed password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    var isPasswordValid = false;
    if (password == user.password) {
      isPasswordValid = true;
    }
    if (isPasswordValid) {
      console.log("Login successful");
      return "Login successful";
    } else {
      console.log("Invalid credentials");
      return "Invalid credentials";
    }
  } catch (error) {
    console.error("Error validating user:", error);
    return "Failed to validate user";
  }
}

// Close MongoDB Connection
async function closeMongoConnection() {
  await client.close();
  console.log("Connection closed");
}

const createResult = updatePassword("ritik.com", "myPassword1223");
console.log(createResult);
