import styled from "styled-components";
import { space, color } from "styled-system";
import propTypes from "@styled-system/prop-types";

const Divider = styled.hr(
  {
    boxSizing: "border-box"
  },
  space,
  color
);

Divider.propTypes = {
  ...propTypes.space,
  ...propTypes.color
};

export default Divider;
