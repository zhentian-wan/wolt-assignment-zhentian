import styled from "styled-components";
import { color, typography, space, layout } from "styled-system";
import PropTypes from "prop-types";

const Text = styled.span(
  {
    margin: 0,
    padding: 0,
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

export const HighlighedText = styled(Text)({
  color: ({ theme }) => theme.colors.green,
  fontSize: "10px",
  fontWeight: "bold"
});

HighlighedText.propTypes = {
  children: PropTypes.node
};

export const SecondaryText = styled(Text)({
  color: ({ theme }) => theme.colors.grey3
});

SecondaryText.propTypes = {
  children: PropTypes.node
};

export const Capitalize = styled(Text)({
  textTransform: "capitalize"
});

export default Text;
