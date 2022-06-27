import styled from "styled-components";
export let Container = styled.section`
  display: grid;
  position: relative;
  margin: auto 7.014vw;
  height: fit-content;
`;
export let Title = styled.h2`
  font-size: 2.625rem;
  line-height: 4.2rem;
  font-weight: 400;
  margin-top: 5rem;
  margin-bottom: 6.438rem;
`;
export let ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2.5rem;
`;
export let OverLayDiv = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100%;
  height: 100vh;
  top: 5rem;
  bottom: 0;
  background: rgba(57, 55, 72, 0.22);
  display: ${(props) => (props.clicked === "none" ? "none" : "flex")};
  z-index: 10;
`;
export let MiniCartContainer = styled.div`
  position: absolute;
  background-color: #5ece7b;

  top: 5rem;
  z-index: 12;
  width: 45.14vw;
  right: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.clicked === "none" ? "none" : "flex")};
`;
