import styled from "styled-components";
import { space, layout, color } from "styled-system";

const Box = styled("div")(
  {
    boxSizing: "border-box",
    display: "inline-block"
  },
  space,
  layout,
  color
);

export default Box;
