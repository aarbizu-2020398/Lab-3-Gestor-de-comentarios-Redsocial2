import Comment from './comments.model.js';

export const createComment = async (req, res) => {
  try {
    const c = await Comment.create({
      publication: req.params.pubId,
      author: req.body.author,
      content: req.body.content
    });
    res.status(201).json({ success: true, comment: c });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getCommentsByPublication = async (req, res) => {
  const comments = await Comment.find({ publication: req.params.pubId })
    .sort({ date: -1 });
  res.json({ success: true, comments });
};
