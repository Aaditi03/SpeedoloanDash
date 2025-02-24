import styled from "styled-components";
import banner from "../../images/loginImg.jpg";
import loginBanner from "../../images/loginBanner.jpg" // Import your mobile banner image

export const Loginwrapper = styled.div`
  width: 100%;
  min-height: 695px;
  padding: 70px 20px 0;
  font-family: "Lato", sans-serif;
  background: url(${banner});
  background-size: cover;
  justify-content: end !important;

  .right {
    flex: 1 1 100%;
    margin-right: 100px;
    max-width: 427px;
    min-height: 420px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 15px;
    padding: 50px 20px;
    align-self: center;

    .form {
      max-width: 300px;
      margin-inline: auto;

      h2 {
        font: normal normal medium 25px/30px Balto;
        letter-spacing: 0px;
        color: #082654;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        margin-bottom: 26px;
      }

      .otpBox {
        margin-bottom: 60px;
      }
      .resend {
        margin-top: 20px;

        p {
          font-size: 13px;
          font-weight: 600;
        }
      }
    }
  }

  .left {
    display: none;
    flex: 1 1 100%;
    align-self: flex-end;
    max-width: 730px;
    position: relative;
    padding-left: 60px;
    min-height: 300px;

    img {
      width: 100%;
      position: relative;
      bottom: -10px;
    }
    .textBox {
      position: absolute;
      left: -60px;
      bottom: 37%;
      color: #fff;

      h2 {
        font-size: 52px;
        line-height: 52px;
        margin-bottom: 11px;
      }
      div {
        font-size: 35px;
        line-height: 42px;
        background: #072555 0% 0% no-repeat padding-box;
        border-radius: 20px;
        max-width: 300px;
        text-align: center;
        padding-block: 12px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    background: url(${loginBanner}); /* Change background image for mobile */
    min-height: 0; /* Set min-height to 0 on smaller screens */
    padding: 70px 20px 30px;
  }

  @media only screen and (max-width: 480px) {
    .right {
      margin-right: 10px !important;
      margin-left: 9px;
      max-width:349px !important;
    }
  }
`;

export const FormWrapper = styled.div`
  margin-block: 28px;

  .inputBox {
    max-width: 640px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    & > div {
      flex: 1 1 240px;
      margin-bottom: 0;
      max-width: calc(50% - 10px);

      &.min-w100 {
        min-width: 100%;
      }
    }

    .otp-input {
      max-width: 73%;
    }

    &.panBox {
      width: 100%;
      max-width: 100%;
    }
  }

  .button {
    max-width: 300px;
    width: 100%;
    margin-top: 30px;
  }

  .subheading {
    font-size: 25px;
    color: #082654;
    line-height: 30px;
    font-weight: 600;

    &.small {
      font-size: 14px !important;
    }
  }

  @media only screen and (max-width: 540px) {
    .button {
      max-width: 100%;
    }
    .inputBox {
      & > div {
        max-width: 100%;
        width: 100%;
      }
    }
  }
`;


export const FormWrapper2 = styled.div`
      margin-block: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

  .inputBox {
    max-width: 640px;
  

    & > div {
      flex: 1 1 240px;
      margin-bottom: 0;
      max-width: calc(50% - 10px);

      &.min-w100 {
        min-width: 100%;
      }
    }

    .otp-input {
      max-width: 100%;
    }

    &.panBox {
      width: 100%;
      max-width: 100%;
    }
  }

  .button {
    max-width: 300px;
    width: 100%;
    margin-top: 30px;
  }

  .subheading {
    font-size: 25px;
    color: #082654;
    line-height: 30px;
    font-weight: 600;

    &.small {
      font-size: 14px !important;
    }
  }

  @media only screen and (max-width: 540px) {
    .button {
      max-width: 100%;
    }
    .inputBox {
      & > div {
        max-width: 100%;
        width: 100%;
      }
    }
  }
`;