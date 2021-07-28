// index controller object for index controller methods
const indexController = {
  // sample index server test print
  getHome: (req, res) => {
    res.send('AGC PRINT SERVER');
  },
};

// export index routes
export default indexController;
