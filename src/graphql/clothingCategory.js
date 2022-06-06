import { gql } from "@apollo/client";
export let LOADD_CLOTHING = gql`
  query {
    category(input: { title: "clothes" }) {
      name
      products {
        inStock
        id
        name
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
