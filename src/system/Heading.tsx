import React from "react";
import styled from "styled-components";
import { variant, space } from "styled-system";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

const HeadingBase = ({ level, as: Component = `h${level}`, ...props }) => (
  <Component {...props} />
);

const Heading = styled(HeadingBase)(
  {
    margin: 0,
    color: ({ theme }) => theme.colors.black
  },
  variant({
    prop: "level"
  }),
  space
);

Heading.propTypes = {
  ...propTypes.space,
  level: PropTypes.oneOf([1, 2, 3]).isRequired,
  children: PropTypes.node
};

export default Heading;
