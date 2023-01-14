import styled from "styled-components";
import { FileProtectOutlined, LaptopOutlined } from "@ant-design/icons";

const Container = styled.div`
  .package {
    top: 60%;
    left: 5%;
    animation: move-x 10s linear infinite, move-y 10s linear infinite;
    width: 43%;
    max-height: 200px;
  }

  @keyframes move-x {
    0% {
      left: 5%;
      animation-timing-function: ease-in;
    }
    7% {
      left: 5%;
      animation-timing-function: ease-in;
    }
    25% {
      left: 50%;
      animation-timing-function: ease-out;
    }
    46.5% {
      left: 88%;
      animation-timing-function: ease-in;
    }
    53.5% {
      left: 88%;
      animation-timing-function: ease-in;
    }
    75% {
      left: 50%;
      animation-timing-function: ease-out;
    }
    100% {
      left: 5%;
      animation-timing-function: ease-in;
    }
  }

  @keyframes move-y {
    0% {
      top: 60%;
      animation-timing-function: ease-out;
    }
    7% {
      top: 60%;
      animation-timing-function: ease-out;
    }
    25% {
      top: 0;
      animation-timing-function: ease-in;
    }
    46.5% {
      top: 60%;
      animation-timing-function: ease-out;
    }
    53.5% {
      top: 60%;
      animation-timing-function: ease-out;
    }
    75% {
      top: 0%;
      animation-timing-function: ease-in;
    }
    100% {
      top: 60%;
      animation-timing-function: ease-out;
    }
  }
`;

const SendPackage = () => {
  return (
    <Container className="w-full h-52 relative my-10">
      <span className="package text-4xl absolute text-blue-500">
        <FileProtectOutlined />
      </span>
      <div className="flex justify-between items-end w-full bottom-0 absolute">
        <span className="text-4xl">
          <LaptopOutlined />
        </span>
        <span className="text-4xl">
          <LaptopOutlined />
        </span>
      </div>
    </Container>
  );
};

export default SendPackage;
