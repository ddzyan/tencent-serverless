const ignore = /^\/(assets|agent)/;

module.exports = async (req, res, next) => {
  // Assets do not out log.
  if (ignore.test(req.url)) {
    await next();
    return;
  }

  let t = new Date();
  console.info(req.method, req.url, req.ip, JSON.stringify(req.body));
  res.on("finish", () => {
    let duration = new Date() - t;

    console.info("Completed", res.statusCode, `(${duration} ms)`);
  });

  await next();
};
