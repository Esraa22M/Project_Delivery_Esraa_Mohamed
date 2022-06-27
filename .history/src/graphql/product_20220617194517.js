import { gql } from "@apollo/client";
export let LOAD_PRODUCT = gql`
  # Write your query or mutation here
  query {
    product(id:$product_id) {
        __typename @skip(if: true)

      id
      brand
      attributes {
        __typename @skip(if: true)

        id
        name
        type
        items {
            __typename @skip(if: true)

          displayValue
          value
          id
        }
      }
      name
      gallery
      prices {
        __typename @skip(if: true)

        currency {
            __typename @skip(if: true)

          symbol
        }
        amount
      }
      inStock
      description
    }
  }
`;
