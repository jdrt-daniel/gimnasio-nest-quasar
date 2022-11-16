import { Notify } from 'quasar';

const ToastNotification = (
  type: string,
  icon: string,
  message: string,
  time = 4000
) => {
  Notify.create({
    type: type,
    icon: icon,
    message: message,
    timeout: time,
    html: true,
  });
};

export default ToastNotification;
