/**
 * @swagger
 * /booking/:id/review/:
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        description: The token
 *      - in: params
 *        name: id
 *        description: booking Id
 *   produces:
 *      - application/json
 *   patch:
 *     description: update or create accommodation review
 *     tags:
 *       - review
 *     parameters:
 *      - in: body
 *        name: reviews
 *        description: Review data
 *        schema:
 *          type: object
 *          required:
 *            - rating
 *            - feedback
 *          properties:
 *            rating:
 *              type: integer
 *            feedback:
 *              type: string
 *     responses:
 *       200:
 *         description: new or updated review
 *         schema:
 *           type: object
 *       400:
 *         description: Wrong data sent
 */

/**
 * @swagger
 * /accommodation/:id/rating/:
 *   get:
 *     description: get ratings
 *     tags:
 *      - review
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: params
 *        name: id
 *        description: the accommodation id
 *     responses:
 *       200:
 *         description: average rating
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *             averageRating:
 *               type: double
 *       400:
 *         description: Wrong data sent
 */
/**
 * @swagger
 * /accommodation/:id/feedbacks/:
 *   get:
 *     description: get ratings
 *     tags:
 *      - review
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: params
 *        name: id
 *        description: the accommodation id
 *     responses:
 *       200:
 *         description: list of feedbacks
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *             data:
 *               type: array
 *               items:
 *               $ref: '#/definitions/feedback'
 *       400:
 *         description: Wrong data sent
 */
/**
 * @swagger
 * definitions:
 *   feedback:
 *     type: object
 *     required:
 *     properties:
 *       feedback:
 *         type: string
 *       id:
 *         type: string
 */
