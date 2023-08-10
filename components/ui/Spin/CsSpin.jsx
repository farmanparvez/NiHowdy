import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = (<LoadingOutlined style={{ fontSize: 24, color: 'yellow' }}/>);

export default function Spinning(props) {
  return <Spin  indicator={antIcon} {...props}>{props.children}</Spin>;
}
