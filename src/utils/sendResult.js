const sendResult = async (res, status, msg, data) => {
  if (data && data.length === 0) {
    return res.status(status).json({ status: 404, msg: 'Oops no results found' });
  }
  return res.status(status).json({ status, msg, data });
};
export default sendResult;
