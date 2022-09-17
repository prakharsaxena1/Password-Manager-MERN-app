// Removes jwt token from cookie on logout
const logoutUser = (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("Logout");
}

module.exports = {
    logoutUser
}