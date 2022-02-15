const booksController = (Book) => {

    // GET BOOKS
    const getBooks = async (req, res) => {
        const { query } = req;
        const response = await Book.find(query);

        res.status(200).json(response);
    }

    // POST BOOKS
    const postBooks = async (req, res) => {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    }

    // GET BOOK BY ID
    const getBookById = async(req, res) => {
        try{
            const { params } = req;
            const response = await Book.findById(params.bookId);
            
            res.json(response);
        }catch(err){
            res.status(500).json(err.name);
        }
    }

    // UPDATE BOOK BY ID
    const putBooks = async (req, res) => {
        try{
            const { body } = req;
            const response = await Book.updateOne({
                _id: req.params.bookId
            },
            {
                $set:{
                    title: body.title,
                    genre: body.genre,
                    author: body.author,
                    read: body.read
                }
            })
            res.json(response);
        }catch(err){
            res.status(500).json(err.name);
        }
    }
    
    // DELETE BOOK BY ID
    const deleteBooks = async (req, res) => {
        try{
            const id = req.params.bookId;

            await Book.findByIdAndDelete(id);

            res.status(202).json('Book has been deleted...')
        }catch(err) {
            res.status(500).json(err.name);
        }
    }

    // GET A BOOK FOR SOME QUEST WITH QUERY PARAMS
    const getBooksBySearch = async (req, res) => {
        const key = Object.keys(req.query);
        const values = Object.values(req.query);
        const query = {};

        if(key[0] === 'author') {
            query['author'] = values
        }else if(key[0] === 'title'){
            query['title'] = values
        }

        const response = await Book.findOne(query);
        res.status(200).json(response);
    }

    return { getBooks, getBooksBySearch, postBooks, getBookById, putBooks, deleteBooks };
}

module.exports = booksController;