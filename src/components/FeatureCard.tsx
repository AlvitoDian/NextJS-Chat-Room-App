import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faComments,
  faUsers,
  faMobile,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

function FeatureCard({ title, icon, description }) {
  let iconComponent;
  switch (icon) {
    case "faUser":
      iconComponent = <FontAwesomeIcon icon={faUser} />;
      break;
    case "faComments":
      iconComponent = <FontAwesomeIcon icon={faComments} />;
      break;
    case "faUsers":
      iconComponent = <FontAwesomeIcon icon={faUsers} />;
      break;
    case "faMobile":
      iconComponent = <FontAwesomeIcon icon={faMobile} />;
      break;
    case "faUserPlus":
      iconComponent = <FontAwesomeIcon icon={faUserPlus} />;
      break;
    case "faEye":
      iconComponent = <FontAwesomeIcon icon={faEye} />;
      break;
    default:
      iconComponent = <FontAwesomeIcon icon={faUser} />;
  }

  return (
    <div className="bg-white border border-[#d7cafc] border-[1px] rounded-md">
      <div className="flex p-5">
        {/* Icon */}
        <div className="w-5">
          <div className="text-gray-500 w-10 h-10 rounded-full bg-blue-100 flex justify-center items-center">
            {iconComponent}
          </div>
        </div>

        {/* Explain */}
        <div className="ml-10 flex flex-col">
          <span className="font-medium text-md text-gray-900">{title}</span>
          <span className="text-sm text-gray-500">{description}</span>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
