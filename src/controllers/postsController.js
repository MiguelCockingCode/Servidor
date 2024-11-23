import {getAllPosts, createPost, updatePost} from "../models/postsModel.js";
import fs from "fs";
import generateDescriptionOfGemini from "../services/geminiServices.js";

export async function listingPosts(req, res){
    const posts = await getAllPosts();
    res.status(200).json(posts);
};
    
export async function NewPost(req, res){
    const newPost = req.body;
    try{
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    }catch(error){
        console.log(error.message);
        res.status(500).json({"Error":"Requisition failed"});
    }
}

export async function uploadImage(req, res){
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{
        const postCreated = await createPost(newPost);
        const updatedImage = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(postCreated);
    }catch(error){
        console.log(error.message);
        res.status(500).json({"Error":"Requisition failed"});
    }
}

export async function updateNewPost(req, res){
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;
    try{
        const imageBuff = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateDescriptionOfGemini(imageBuff);

        const post = {
            imgUrl: urlImage,
            description: description,
            alt: req.body.alt
        }

        const postCreated = await updatePost(id, post);
        res.status(200).json(postCreated);
    }catch(error){
        console.log(error.message);
        res.status(500).json({"Error":"Requisition failed"});
    }
}