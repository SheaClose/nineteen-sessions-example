module.exports = {
  login(req, res) {
    if (req.body.password === "password") {
      req.session.username = req.body.username;
      console.log("req.session: ", req.session);
      return res.status(200).json(req.session);
    } else {
      console.log("req.session: ", req.session);
      return res.status(500).json("no go");
    }
  }
};
