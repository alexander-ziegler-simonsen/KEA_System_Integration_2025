import { Router } from "express";

// this is not a server, only one server can use one port at a time
// this is just a router
const router = Router();

router.get('/hello', (req, res) => {
    res.send({data: "hello"});
});

let nextId = 4;

const users = [
    {id: 1, name: "Arne"},
    {id: 2, name: "Minho"},
    {id: 3, name: "Carlie"}
];

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:	
 *         description: Returns all users
 */
router.get("/api/users", (req, res) => {
    res.send({data: users});
});


/**
 * @openapi
 * /api/users:
 *   post:
 *     description: add many users
 *     responses:
 *       200:	
 *         description: done. added all
 */
router.post("/api/users", (req, res) => {
    res.send({data: users});
})

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: add one user
 *     responses:
 *       200:	
 *         description: done. add one
 */
router.post("/api/users", (req, res) => {
    const newUser = req.body;
    newUser.id = nextId++;
    users.push(newUser);
})

export default router;