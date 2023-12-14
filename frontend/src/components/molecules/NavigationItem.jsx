import React from "react";
import Icon from "../atoms/Icon";
import TextLink from "../atoms/TextLink";

const NavigationItem = ({ icon, to, text }) => {
  return (
    <li>
      <TextLink to={to}>
        {icon && <Icon src={icon} alt="" />}
        {text}
      </TextLink>
    </li>
  );
};

export default NavigationItem;
