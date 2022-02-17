const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const scheme = await db('schemes').where('scheme_id', req.params.scheme_id)
  console.log(scheme)
  if(scheme.length){
    next()
  } else {
    res.status(404).json({message: `scheme with scheme_id ${req.params.scheme_id} not found`})
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const scheme_name = req.body.scheme_name
  if(scheme_name && typeof(scheme_name) === 'string' && scheme_name.length > 0)
    {
    next()
  } else {
    res.status(400).json({message: "invalid scheme_name"})
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions
  const number = req.body.step_number

  if(instructions && typeof(instructions) === 'string' && instructions.length > 0 && typeof(number) === 'number' && number > 0){
    next()
  } else {
    res.status(400).json({message: "invalid step"})
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
