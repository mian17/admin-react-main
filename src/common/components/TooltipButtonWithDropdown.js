import { Dropdown, OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TooltipButtonWithDropdown = ({
  functionToProcessOnClick,
  title,
  bootstrapVariant,
  fontAwesomeIcon,
  items,
}) => {
  console.log(items);
  return (
    <OverlayTrigger
      delay={300}
      placement="bottom"
      overlay={<Tooltip>{title}</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Dropdown>
          <Dropdown.Toggle
            {...triggerHandler}
            ref={ref}
            variant={bootstrapVariant}
          >
            <FontAwesomeIcon icon={fontAwesomeIcon} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {items &&
              items.map((item, i) => (
                <Dropdown.Item
                  key={i}
                  value={item.id}
                  onClick={functionToProcessOnClick}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </OverlayTrigger>
  );
};
export default TooltipButtonWithDropdown;
// onClick={functionToProcessOnClick}
