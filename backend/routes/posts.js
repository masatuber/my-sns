const router = require("express").Router();
//Post.jsよりインポートする
const Post = require("../models/Post");
//User.jsよりスキーマインポートする
const User = require("../models/User");
// const cors = require('cors');
// router.use(cors());
//投稿を作成する処理API
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//投稿を編集するAPI
//tryにifの入れ子構造
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userid === req.body.userid)
        {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿編集に成功しました!");
        } else {
            return res.status(403).json("あなたは他のユーザーの投稿を編集出来ません");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

//投稿を削除するAPIS
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userid === req.body.userid)
        {
            await post.deleteOne();
            return res.status(200).json("投稿削除に成功しました!");
        } else {
            return res.status(403).json("あなたは他のユーザーの投稿を削除出来ません");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

//特定の投稿を取得するAPI
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(403).json(err);
    }
});

//特定の投稿にいいねを付ける
router.put("/:id/like", async (req, res) => {
    //tryにifの構造
        try {
            //これからポストするユーザーの変数定義
            const post = await Post.findById(req.params.id);
            //まだ投稿にいいねが押されていなかったら押せるlikesはデータスキーマより参照する
            if(!post.likes.includes(req.body.userid)) {
                await post.updateOne({
                    $push: {
                        likes: req.body.userid,
                    },
                });
                return res.status(200).json("投稿にいいねを押しました!");
            //投稿に既にいいねが押されていたらいいねは押せない条件
            } else {
            //いいねしているユーザーIDを取り除く
                await post.updateOne({
                    $pull: {
                    likes: req.body.userid,
                },
            });
                return res
                .status(403)
                .json("投稿にいいねを外しました");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
});

//プロフィール専用のタイムラインを取得
router.get("/profile/:username", async (req, res) =>{
    
    try {
        //findOneはプロパティが必要
        const user = await User.findOne({username: req.params.username });
        //useridはPostデータスキーマ、投稿を全部見つける_idが必要
        const Posts = await Post.find({ userid: user._id });
        
        return res.status(200).json(posts);
    } catch (err) {
        
        return res.status(500).json(err);
    }
});

//タイムラインの投稿取得する:idと区別するために/allがルーティング設定になる
router.get("/timeline/:userid", async (req, res) =>{
    console.log("API到達テスト", req.params);  // パラメータをログ出力
    try {
        const currentUser = await User.findById(req.params.userid);
        //useridはPostデータスキーマ、投稿を全部見つける_idが必要
        const userPosts = await Post.find({ userid: currentUser._id });
        //自分がフォローしている友達の投稿内容を全て取得する
        //Promise.allはcurrentUser変数に非同期処理があるのでPromiseを使う
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userid: friendId });
            })
        );
        //concat()で配列を繋げて...friendPostsの配列を展開する（スプレッド構文）
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        console.error("API Error:", err);  // エラーをログ出力
        return res.status(500).json(err);
    }
});

module.exports = router;
