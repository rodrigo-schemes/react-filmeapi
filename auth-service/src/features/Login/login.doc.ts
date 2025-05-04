/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Realiza o login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nome do usuário
 *                     email:
 *                       type: string
 *                       description: E-mail do usuário
 *                     token:
 *                       type: string
 *                       description: Token JWT gerado para autenticação
 *                     expiresAt:
 *                       type: integer
 *                       description: Data de expiração do token (timestamp)
 *       400:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["'E-mail inválido", "Senha é obrigatória"]
 *       429:
 *         description: Muitas requisições — limite excedido
 */
