import express from 'express';
import valid from '../validation';
import reqMidd from '../middlewares/requestMiddlware';
import userMidd from '../middlewares/userMiddlware';
import roles from '../middlewares/rolesMiddlewares';
import comment from '../controllers/commentController';

const app = express.Router();

const { checkExistingRequest } = reqMidd;
const { checkRequestOwner } = roles;
const { checkToken } = userMidd;
const { addCommentValidation, viewCommentValidation } = valid;
const { addComment, viewComment } = comment;

app.post('/', addCommentValidation, checkToken, checkExistingRequest, checkRequestOwner, addComment);
app.get('/:requestId', viewCommentValidation, checkToken, checkExistingRequest, checkRequestOwner, viewComment);

export default app;
