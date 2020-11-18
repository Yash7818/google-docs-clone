import express from 'express'
import User from '../models/usermodel'
import { getToken, isAuth } from '../utils'
const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinuser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (signinuser) {
        res.send({
            _id: signinuser.id,
            name: signinuser.name,
            email: signinuser.email,
            isAdmin: signinuser.isAdmin,
            token: getToken(signinuser)
        })
    } else {
        res.status(401).send({ error: 'Invalid Credentials' })
    }
})
router.post('/register',async(req,res)=>{

    const inuser = await User.findOne({
        email:req.body.email
    })
    if(inuser){
        return new Error('User already exist')
    }
    try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        const newUser = await user.save()
        if (newUser) {
            res.send({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                token: getToken(newUser)
            })
        }
    } catch (e) {
        res.status(404).send(e)
        console.log(e)
    }
})
router.put('/:id', isAuth, async (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const userId = req.params.id;
    const user = await User.findById(userId)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        const updateUser = await user.save();
        res.send({
            _id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            token: getToken(updateUser)
        })

    } else {
        res.status(404).send({ message: 'User not found' })
    }
})
export default router