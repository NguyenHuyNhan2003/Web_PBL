
// function App(app){
//     app.get("/api",(req,res)=>{
//         res.json({"users":["userOne","userTwo","userThree","usersFour"]})
//     });
//     app.get('/data',(req,res)=>{
//         res.send("Danh Sách Người Dùng");
//     })
//     app.get('/page',(req,res)=>{
//     })
// }
const pageRouter = require('./page');
const postRouter = require('./post');
const companyRouter = require('./company');
const userRouter = require('./user')
const blogRouter = require('./blog')
function route(app){
    app.use('/data',pageRouter);
    app.use('/post',postRouter);
    app.use('/company',companyRouter); 
    app.use('/user',userRouter)
    app.use('/blog',blogRouter)
}
module.exports = route;
