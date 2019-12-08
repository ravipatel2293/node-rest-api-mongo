let generate = (err, message, status,data) =>{
  let response = {
      error:err,
      message:message,
      status:status,
      payload:data
  }
  return response
}

module.exports= {
  generate:generate
}