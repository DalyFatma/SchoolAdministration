import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar2 from "assets/images/users/avatar-2.jpg";
import avatar3 from "assets/images/users/avatar-3.jpg";
import avatar4 from "assets/images/users/avatar-4.jpg";
import avatar5 from "assets/images/users/avatar-5.jpg";
const GroupAvatar = () => {
  return (
    <div className="mt-lg-0 mt-3">
      <div className="avatar-group">
        <Image src={avatar4} alt="" className="rounded-circle avatar-xs" />

        <Image src={avatar3} alt="" className="rounded-circle avatar-xs" />

        <Image src={avatar2} alt="" className="rounded-circle avatar-xs" />
        <div className="avatar-xs">
          <div className="avatar-title rounded-circle bg-light text-primary">
            C
          </div>
        </div>
        <div className="avatar-xs">
          <div className="avatar-title rounded-circle">2+</div>
        </div>
      </div>
    </div>
  );
};

export default GroupAvatar;
