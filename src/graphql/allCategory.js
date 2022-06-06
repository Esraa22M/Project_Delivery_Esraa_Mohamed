import { gql } from "@apollo/client";
export let LOADD_ALL = gql`
  query {
    category(input: { title: "all" }) {
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
