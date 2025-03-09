/* eslint-disable no-undef */
const router = require("express").Router( );
const User = require("../models/User");
//ユーザー登録レジスター
router.post("/register", async ( req, res) => {
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save( );
        return res.status(200).json(user);
        
    } catch (err ) {
        return res.status(500).json(err);
    }
} );

//ログインAPI,findOne(mongooseにある)でユーザー見つける
router.post("/login", async ( req, res ) => {
    try {
        const user = await User.findOne( { email: req.body.email } );
        //ユーザー登録がない状態を返す処理
        if(!user) return res.status(404).status.send("ユーザーが見つかりません");
        //ユーザー登録でのPWと照合しOKなら200をuser情報を返す処理
        const vailedPassword = req.body.password === user.password;
        if(!vailedPassword) return res.status(400).json("パスワードが違います");

        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.get( "/", (req, res) =>{
//     res.send("auth router");
// });

module.exports = router;
