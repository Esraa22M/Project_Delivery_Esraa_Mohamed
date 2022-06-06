import { gql } from "@apollo/client";
export let LOADD_CURRENCY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
