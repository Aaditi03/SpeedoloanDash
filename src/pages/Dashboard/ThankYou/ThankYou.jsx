import React, { useEffect, useState } from 'react';
import { BoxWrapper } from '../../../style';
import congratulations from "../../../images/congratulations.gif";
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../../../Utils/common';


function ThankYou() {
  const navigate = useNavigate();
  const [progressBar, setProgressBar] = useState(getStorage('percent'));


  return (
    <div>
      


      <BoxWrapper className="w100 gray">
        <div
          className="formmainBox flex"
          style={{
            backgroundImage: `url(${congratulations})`,
            backgroundSize: 'cover',
            height: '615px',
            width: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="left">
            {/* Any other content you want to show */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default ThankYou;
