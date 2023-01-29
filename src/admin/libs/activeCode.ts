const GetActiveCode = () => {
  let active_code = Math.floor(100000 + Math.random() * 900000);
  var now = new Date();

  let expire_code = new Date(
    now.setMinutes(now.getMinutes() + parseInt(process.env.WAIT_TIME_FOR_CODE))
  );

  return { active_code, expire_code };
};

const ValidationCheck = (date: Date) => {
  var now = new Date();
  let expire_code: any = new Date(
    now.setMinutes(now.getMinutes() + parseInt(process.env.WAIT_TIME_FOR_CODE))
  ).getTime();

  var diffMs = expire_code - new Date(date).getTime();
  var diffMins = Math.round((diffMs % 3600000) / 60000);

  return diffMins < parseInt(process.env.WAIT_TIME_FOR_CODE);
};

export { GetActiveCode, ValidationCheck };
