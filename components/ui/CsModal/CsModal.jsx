import { Modal } from "antd";
// import "./styles.scss";

const CsModal = (props) => {
  return (
    <div className="csModal">
      <Modal bodyStyle={{backgorund: '#333652'}} wrapClassName="csModal" {...props}>
        {props.children}
      </Modal>
    </div>
  );
};

export default CsModal;
