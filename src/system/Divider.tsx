import styled from "styled-components";
import { space, color } from "styled-system";
// @ts-ignore
import propTypes from "@styled-system/prop-types";

const Divider = styled.hr(
  {
    boxSizing: "border-box",
  },
  space,
  color
);

Divider.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
};

Divider.displayName = "Divider";

export default Divider;
