import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger } from "react-bootstrap";

const TooltipButton = ({
  functionToProcessOnClick,
  title,
  bootstrapVariant,
  fontAwesomeIcon,
}) => {
  return (
    <OverlayTrigger
      delay={300}
      placement="bottom"
      overlay={<Tooltip>{title}</Tooltip>}
    >
      <Button variant={bootstrapVariant} onClick={functionToProcessOnClick}>
        <FontAwesomeIcon icon={fontAwesomeIcon} />
      </Button>
    </OverlayTrigger>
  );
};
export default TooltipButton;
