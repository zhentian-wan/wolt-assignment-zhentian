// @ts-nocheck
import styled from "styled-components";
import { color, typography, space, layout } from "styled-system";
import PropTypes from "prop-types";

const Text = styled.span(
  {
    margin: 0,
    padding: 0,
    color: "black",
  },
  color,
  typography,
  space,
  layout
);

Text.propTypes = {
  children: PropTypes.node,
};
Text.displayName = "Text";

export const HighlighedText = styled(Text)({
  color: ({ theme }) => theme.colors.green,
  fontWeight: "bold",
  fontSize: ({ theme }) => `${theme.fontSizes[0]}px`,
});

HighlighedText.propTypes = {
  children: PropTypes.node,
};
HighlighedText.displayName = "HighlighedText";
export const SecondaryText = styled(Text)({
  color: ({ theme }) => theme.colors.grey3,
});

SecondaryText.propTypes = {
  children: PropTypes.node,
};
SecondaryText.displayName = "SecondaryText";

export const Capitalize = styled(Text)({
  textTransform: "capitalize",
});

Capitalize.propTypes = {
  children: PropTypes.node,
};
Capitalize.displayName = "Capitalize";
export default Text;
