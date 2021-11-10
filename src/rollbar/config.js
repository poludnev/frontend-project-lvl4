const getRollbarConfig = () => ({
  accessToken: 'cb90c916b6474920ab9d4c1c12b8d126',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
});

export default getRollbarConfig;
