import { gql } from "@apollo/client";
export const LOAD_PRODUCTS = gql`query {
    categories {
      name
      products {
        inStock,
        id
        name
        gallery
        description
        category
        attributes{
          id
          name
          type
          items{
    displayValue
            value
            id
          }
        }
        prices{
          currency{
            label
            symbol
          }
          amount
            
          
        }
        brand
        }}
      }
      `