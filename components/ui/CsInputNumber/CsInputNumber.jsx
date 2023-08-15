import { InputNumber } from "antd";

const Inputcs = (props) => {
    return (
        <div className="csInputNumber">
            <InputNumber
                {...props}
                className={`bg-csTextColor-9 h-10 text-white ${props?.csClassName}`}
            />
        </div>
    );
};

export default Inputcs;
