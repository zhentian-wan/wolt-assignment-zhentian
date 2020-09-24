import styled from "styled-components";
import {
  space,
  color,
  border,
  layout,
  flexbox,
  grid,
  shadow,
} from "styled-system";
// @ts-ignore
import propTypes from "@styled-system/prop-types";

const Box = styled.div(
  {
    boxSizing: "border-box",
  },
  space,
  color,
  border,
  shadow,
  layout,
  flexbox,
  grid
);

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.border,
  ...propTypes.shadow,
  ...propTypes.layout,
  ...propTypes.flexbox,
  ...propTypes.grid,
};

export default Box;
