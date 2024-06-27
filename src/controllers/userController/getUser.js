const getUser = async (req, res) => {
  const userResponse = req.user;

  let user = {
    name: userResponse.name,
    email: userResponse.email,
    image: userResponse.image,
    role: userResponse.role,
  };

  return res.status(200).json({
    message: "Ok",
    user,
    error: false,
  });
};

export default getUser;
