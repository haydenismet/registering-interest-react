// here we'll define a model (schema) to use for handling errors so we don't repeat code. We'll use the JS class method, which is a blueprint for a JS object, so it's already setup with the keys and potential value pairs. Sort of like obstructors/classes to add to. We'll use the extends js term which basically adds to the existing JS ERROR method.

//classes (constructor functions) convention use capital starting character.
class HttpError extends Error {
  //constructor helps us to extend the Error method by adding our own additional parameters when throwing an error.
  constructor(message, errorCode) {
    super(message); //super calls the constructor of the base class we're extending - in this case Error - and we forward the message constructor to it that we've added in our class (HttpError) to Error. As error already has a 'message' param, we're basically saying use our HttpError message instead of the built in one.
    this.code = errorCode; // as code doesn't exist natively within the Error constructor, we're saying this.code should be attached to Error via our HttpError class, and this.code should equal errorCode.
  }
}
//to use outside of this file.
module.exports = HttpError;
