export const getBlogsHandler = async (req, reply) => {
  try {
    const blogs = await req.server.blog.findAll();
    await reply.code(200).view("/templates/blogs.ejs", { blogs });
  } catch (err) {
    console.log(err);
  }
};

export const postBlogsHandler = async (req, reply) => {
  try {
    const blog = await req.server.blog.create({
      title: req.body.title,
      content: req.body.content,
    });
    reply.redirect("/blogs");
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlogsHandler = async (req, reply) => {
  try {
    const blog = await req.server.blog.destroy({
      where: { blogId: req.params.blogId },
    });
    reply.redirect("/blogs");
  } catch (err) {
    console.log(err);
  }
};
