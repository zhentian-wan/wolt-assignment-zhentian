import styled from "styled-components";
import Box from "./Box";

const Flex = styled(Box)({
  display: "flex",
});

Flex.propTypes = {
  ...Box.propTypes,
};

export const Row = styled(Flex)({
  flexDirection: "row",
});
Row.propTypes = Box.propTypes;
Row.displayName = "Row";

export const Column = styled(Flex)({
  flexDirection: "column",
});
Column.propTypes = Box.propTypes;
Column.displayName = "Column";

export default Flex;
