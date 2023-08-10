import { notification } from "antd";

export const openNotificationWithIcon = (type, descriptiond, close) => {
  notification[type]({
    message: type === 'success' ? 'Success' : 'Failed',
    description: descriptiond,
    onClose: close ? close() : null,
  });
};