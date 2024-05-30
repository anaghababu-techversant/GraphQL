const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define your GraphQL schema
const schema = buildSchema(`
  type Moonlander {
    id: ID!
    name: String!
    description: String
    weight: Float!
    manufacturer: String!
    gpcClassification: GPCClassification
  }

  type GPCClassification {
    id: ID!
    category: String!
    subcategory: String!
  }

  type Query {
    moonlander(id: ID!): Moonlander
    moonlanders(manufacturer: String, orderBy: String, first: Int, after: String): [Moonlander]
  }
`);

// Define resolver functions
const root = {
  moonlander: ({ id }) => {
    // Simulate fetching a Moonlander object by ID
    if (id === "123") {
      return {
        id: "123",
        name: "Sample Moonlander 1",
        description: "This is a sample Moonlander.",
        weight: 5000,
        manufacturer: "Sample Manufacturer",
        gpcClassification: {
          id: "456",
          category: "Sample Category",
          subcategory: "Sample Subcategory"
        }
      };
    } else {
      return null; // Return null if Moonlander with the provided ID doesn't exist
    }
  },
  moonlanders: () => {
    // Simulate fetching multiple Moonlander objects
    return [
      {
        id: "123",
        name: "Sample Moonlander 1",
        weight: 5000,
        manufacturer: "Sample Manufacturer",
        gpcClassification: {
          id: "456",
          category: "Sample Category",
          subcategory: "Sample Subcategory"
        }
      },
      {
        id: "456",
        name: "Sample Moonlander 2",
        weight: 6000,
        manufacturer: "Sample Manufacturer 2",
        gpcClassification: {
          id: "789",
          category: "Sample Category 2",
          subcategory: "Sample Subcategory 2"
        }
      }
    ];
  }
};

// Create an Express server
const app = express();

// Define GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for testing in the browser
}));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});
