import { gql } from "@apollo/client";
export let LOADD_ALL = gql`
  query allQuery($category_name :String) {
    category(input: { title: $category_name}) {
      __typename @skip(if: true)

      name
      products {
        __typename @skip(if: true)

        inStock
        id
        name
        gallery
        description
        category
        attributes {
          id
          __typename @skip(if: true)

          name
          type
          items {
            __typename @skip(if: true)

            displayValue
            value
            id
          }
        }
        prices {
          __typename @skip(if: true)

          currency {
            __typename @skip(if: true)

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
