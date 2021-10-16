import "./App.css";
import styled from "styled-components";
import Form from "./Form";

const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding: 121px;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
`;

const Footer = styled.div`
  background: #000000;
  font-size: 13px;
  text-align: center;
  color: #999999;
  border-top: solid 3px #fad312;
  padding: 30px;
`;

function App() {
  return (
    <>
      <Wrapper>
        <Form />
      </Wrapper>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </>
  );
}

export default App;
