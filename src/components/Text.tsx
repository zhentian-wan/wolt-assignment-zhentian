import styled from "styled-components";
import { color, typography, space, layout } from "styled-system";
import PropTypes from "prop-types";

const Text = styled.span(
  {
    margin: 0,
    color: "black"
  },
  color,
  typography,
  space,
  layout
);

Text.propTypes = {
  children: PropTypes.node
};

export default Text;
