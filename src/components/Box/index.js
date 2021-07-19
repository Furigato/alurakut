import styled from 'styled-components';

const Box = styled.div`
  color: white;
  background: #000000;
  border-radius: 8px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  box-shadow: 1px 1px 0px #FE2C55, -1px -1px 0px #25F4EE;
  .boxLink {
    font-size: 14px;
    color: #fff;
    text-decoration: none;
    font-weight: 800;
    text-shadow: 1px 1px 0px #FE2C55, -1px -1px 0px #25F4EE;
    
  }
  .title {
    text-shadow: 1px 1px 0px #FE2C55, -1px -1px 0px #25F4EE;
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    text-shadow: 1px 1px 0px #FE2C55, -1px -1px 0px #25F4EE;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 10000px;
    background-color: #000;
    box-shadow: 2px 2px 0px #FE2C55, -2px -2px 0px #25F4EE;
  }
`; 

export default Box