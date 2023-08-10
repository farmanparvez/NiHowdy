import { Button } from "antd";
// import "./style.css";

const CsButton = (props) => {
  return (
    <Button
      {...props}
      type="primary"
      className={
        (props.type === "pr" && `pr ${props?.className}`) ||
        (props.type === "sc" && `sc ${props?.className}`) ||
        (props.type === "bl" && `bl ${props?.className}`)
      }
    >
      {props.children}
    </Button>
  );
};

export default CsButton;
