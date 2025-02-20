import Post from '../models/PostModel.js';
import {StatusCodes} from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

//GET ALL POSTS
export const getAllPosts = async (req, res) => {
    const posts = await Post.find({})
    res.status(StatusCodes.OK).json({ posts });
  };
  
// CREATE POST
export const createPost = async (req, res) => {
    const post = await Post.create(req.body);
    res.status(StatusCodes.CREATED).json({ post });
  };
  
  // GET SINGLE JOB
export const getPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) throw new NotFoundError(`no post with id : ${id}`);
    res.status(StatusCodes.OK).json({ post });
  };

  // EDIT JOB
  export const updatePost = async (req, res) => {
    const { id } = req.params;
    const updatePost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatePost) throw new NotFoundError(`no post with id : ${id}`);
    res.status(StatusCodes.OK).json({ msg: 'post modified', post: updatePost });
  };

  // DELETE JOB
  export const deletePost = async (req, res) => {
    const { id } = req.params;
    const removedPost = await Post.findByIdAndDelete(id);
    if (!removedPost) throw new NotFoundError(`no post with id : ${id}`);
  
    res.status(StatusCodes.OK).json({ msg: 'post deleted', post: removedPost });
  };