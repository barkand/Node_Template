class Response {
  success = { code: 200, message: "success" };
  error = { code: 500, message: "error" };
  custom = (code: number, message: string) => {
    return { code, message };
  };
}

let response = new Response();
export default response;
