const apiUrl = process.env.REACT_APP_APIURL;

// 最後に/をいれる
export const registerURL = `${apiUrl}api/register/`;
export const myselfURL = `${apiUrl}api/myself/`;
export const tasksURL = `${apiUrl}api/tasks/`;
export const taskURL = (taskId: string | number) => `${apiUrl}api/tasks/${taskId}/`;
export const authURL = `${apiUrl}authen/jwt/create/`;
