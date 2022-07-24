import { gql } from "@apollo/client";
export let LOAD_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
