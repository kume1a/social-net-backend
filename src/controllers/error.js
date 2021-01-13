// noinspection JSUnusedLocalSymbols
const onError = (err, req, res, next) => {
  res.status(err.statusCode);
  if (err.statusCode === 422) {
    const validationErrors = err
      .error
      .errors
      .filter((v, i, a) => a.findIndex(t => (t.msg === v.msg)) === i); // filter duplicates
    return res.json(validationErrors);
  }

  console.log(err.error.message );
  res.json({error: err?.error?.message ?? ''});
};

// noinspection JSUnusedLocalSymbols
const on404 = (req, res, next) => {
  res.status(404).json({error: 'route not found'});
};

export {onError, on404};