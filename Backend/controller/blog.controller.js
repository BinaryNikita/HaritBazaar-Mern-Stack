import {blogservice} from "../services/blog.service.js";

export async function addBlog (request,response){
    try{

        if(!request.user || request.user.role !=='admin' || request.user.role !=='vendor')
        {
            res.status(403).json({message:"Access Denied"});
        }

        const author = request.body;
        if(!author)
        {
            return response.status(400).json({message:"Author Required"});
        }
        const newBlog = await blogservice.createBlog(request.body);
    response.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    }catch(error)
    {
        response.status(500).json({message:error.message});
    }
}

export async function fetchAllBlogs(req,res){
    try {
        const blogs = await blogservice.getAllBlogs();
        res.status(200).json({ message: 'Blogs fetched successfully', blogs });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export async function fetchBlogById(req,res)
{
    try{

        let {id} = req.params;
        const blog = await blogservice.getBlogById(id);
        if(!blog)
        {
            res.status(404).json({message:"Blog Not Found"});
        }
        res.status(200).json({message:"Blog Found Successfully",blog});
    }
    catch(error)
    {
        res.status(500).json({ message: error.message });
    }
}

export async function updateBlog(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      
      if (req.user.role !== 'admin' || req.user.role !== 'vendor') {
        return res.status(403).json({ message: ' Authority access required' });
      }
  
      const updatedBlog = await blogservice.updateBlog(id, updateData);
  
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  export async function deleteBlog(req, res) {
    try {
      const { id } = req.params;
  
      
      if (req.user.role !== 'admin' || req.user.role !== 'vendor') {
        return res.status(403).json({ message: ' Authority access required' });
      }
  
      const deletedBlog = await blogservice.deleteBlog(id);
  
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog deleted successfully', blog: deletedBlog });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  