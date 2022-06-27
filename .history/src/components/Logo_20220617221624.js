import React from 'react';
import circle from "../images/halfCircle.svg";
import logoUpper from "../images/logPart1.svg";
import logoLower from "../images/logoPart2.svg";
import arrow from "../images/arrow.svg";
import { Center} from "../styles/Navbar.style";

class Logo extends React.Component {
    render() {
        return   <Center className="flex items-center ">
        <img src={logoUpper} className="logo-part1" alt="logo" />
        <img src={logoLower} className="logo-part2" alt="logo" />

        <div className="logo-arrows">
          <img src={arrow} alt="up-arrow" className="upArrow" />
          <img src={circle} alt="circle" className="circle" />
        </div>
      </Center>;
    }
}
export default Logo;