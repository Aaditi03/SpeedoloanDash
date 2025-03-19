import styled from "styled-components";

export const ProgressBarWrapper = styled.div`
  background: beige 0% 0% no-repeat padding-box;
  padding: 10px;
  border-radius: 15px;

  & > .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 2px #00000014;
    border-radius: 13px;
    padding: 18px;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap; /* Makes items stack on smaller screens */

    h2 {
      font-size: 20px;
      color: #000;
      white-space: nowrap;
      margin: 0;
    }

    & > div:last-child {
      /* ProgressBarBox styling */
      flex: 1;
      min-width: 150px;
    }
  }

  p {
    font-size: 15px;
    text-align: center;
    color: #000;
    padding: 12px 12px 10px;
  }

  @media only screen and (max-width: 768px) {
    p {
      font-size: 12px;
      line-height: 16px;
    }
    & > .flex {
      flex-direction: column;
      align-items: flex-start;

      h2 {
        font-size: 16px;
        white-space: normal;
      }
    }
  }
`;

export const ProgressBoxWrapper = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 25px;
  overflow: hidden;
  height: 25px;
  position: relative;

  .progress-bar {
    height: 100%;
    width: 0;
    text-align: center;
    line-height: 25px;
    color: white;
    font-weight: bold;
    white-space: nowrap;
    transition: width 0.6s ease-in-out;
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
    border-radius: 25px;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2);
  }

  &:hover .progress-bar {
    background: linear-gradient(90deg, #ff9966, #ff5e62);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  }
    .progress-container {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap; /* important for responsiveness */
}

@media (max-width: 768px) {
  .progress-container {
    flex-direction: column;
    align-items: flex-start;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }
}

`;
