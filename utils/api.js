var api = "http://127.0.0.1:5000/api";
// var api = "https://flask-9s0h-61356-9-1319526226.sh.run.tcloudbase.com/api";

module.exports = {
    loginUrl: api + "/login",
    newUserUrl: api + "/newuser",
    userInfoUrl: api + "/userinfo",
    postIdUrl: api + "/postid",
    newPostUrl: api + "/newpost",
    uploadUrl: api + "/upload",
    listPostsUrl: api + "/list",
    listMyPostsUrl: api + "/list/myposts",
    listUserPostsUrl: api + "/list/user",
    detailsUrl: api + "/details",
}