import express from "express";
import {blogController} from "../controller/blog.controller.js";

const route = express.Router();

route.post("/addBlog",blogController.addNewBlog);
route.get("/allBlogs",blogController.fetchAllBlogs);
route.get("/allBlogs/:id",blogController.fetchBlogById);
route.put('/:id', blogController.updateBlog);
route.delete('/:id', blogController.deleteBlog);

export default route;