import styled from "styled-components";

export const SidebarWrapper = styled.div`
  width: 232px;
  min-width: 232px;
  position: absolute;
  top: 0px;
  left: 20px;
  padding-right: 20px;
  background: #F9F9F9;
  z-index: 11;
  bottom: 0;
  transition: all .3s;
ul{
    li{
background: linear-gradient(90deg, #ff7e5f, #feb47b) no-repeat padding-box;
         border-radius: 10px;
         display: flex;
         gap: 8px;
         align-items: center;
         height: 45px;
         padding: 13px;
         color: #ffff;
         margin-bottom: 10px;
         border: 1px solid transparent;
         transition: all .3s;
         span{
            display: block;
            font-size: 15px;
            font-weight: 600;
            width: 100%;
            visibility: visible;
            opacity: 1;
            white-space: nowrap;
         }
         &:hover{
            box-shadow: 0px 1px 2px rgba(240, 225, 225, 0.09);
border: 1px solidrgb(61, 62, 62);
         }
         &.active{
          background-color:rgb(68, 68, 70);
          color: #fff;
          img{
            
          }
         }
    }
}

&.close{
   min-width: 80px;
   width: 80px;
   overflow: hidden;
   transition: all .3s;
   ul li {
    justify-content: center;
    span{
      visibility: hidden;
      opacity: 0;
      display: none;
    
   }
   }
   @media only screen and (max-width: 768px)  {

   min-width: 232px;
   width: 232px;
   left: -244px;
   overflow: hidden;
   ul li {
  justify-content: start;
    span{
    display: block;
   }
 
}
}
}

`;