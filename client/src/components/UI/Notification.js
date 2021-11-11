import { notification } from 'antd';

export const Notification = (type, message, description = '', duration = 4) => {
	notification[type]({
		message ,
		description ,
		duration ,
	});
}