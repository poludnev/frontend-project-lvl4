// @ts-check
// import '../assets/application.scss';
import init from './init.jsx';

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async (socketClient) => {
  const vdom = await init(socketClient);
  return vdom;
};

export default app;
