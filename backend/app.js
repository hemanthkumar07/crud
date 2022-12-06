const Express = require ('express')
const BodyParser = require ('body-parser')
const Cors = require ('cors')
const Mysql2 = require ('mysql2')
const { DiscFull } = require('@mui/icons-material')

const App = Express()

App.use (Express())
App.use (BodyParser.urlencoded({extended:true}))
App.use (BodyParser.json())
App.use(Cors())


App.get('/',(Req,Res)=>{
    Res.send('hello')
})

let Db=Mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'imdb',
    port:3306  
})

Db.connect(err=>{
    if(!err){console.log("Db connect success")}
    else{
        console.log("Db is not connected error=",err)
    }
})

App.get('/movies',(Req,Res)=>{
    Res.setHeader("Access-Control-Allow-Origin", "*")
Res.setHeader("Access-Control-Allow-Credentials", "true");
Res.setHeader("Access-Control-Max-Age", "1800");
Res.setHeader("Access-Control-Allow-Headers", "content-type");
Res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    let Query ='select * from movies';
    Db.query(Query,(Err,Result)=>{
        if(Err){
            console.log('Cannot get data',Err)}
        else {
            Res.send(Result)
        }
    })
})



App.get('/movies/:id',(Req,Res)=>{
    let Gid=Req.params.id
    let Query=`select * from movies where movie_id=${Gid}`;
    Db.query(Query,(Err,Result)=>{
        if(Err){console.log('cannot get data of id 1',Err)}
        else{
            Res.send(Result)
        }
    })
})



// App.post("/movies",(Req,Res)=>{
//     let movie_name=Req.body.movie_name
//     let movie_year=Req.body.movie_year
//     let imdb_rating=Req.body.imdb_rating
//     let your_rating=Req.body.your_rating
//     let Image=Req.body.Image
//     let Query=`insert into movies (movie_name,movie_year,imdb_rating,your_rating,Image) values('${movie_name}','${movie_year}','${imdb_rating}','${your_rating}','${Image}')`
//     Db.query(Query,(Err,Result)=>{
//         if(Err){console.log('cannot post data',Err)}
//         else{
//             Res.send(Result)
//         }
//     })
// })
App.post("/movies",(Req,Res)=>{
    let movie_name=Req.body.movie_name
    let movie_year=Req.body.movie_year
    let imdb_rating=Req.body.imdb_rating
    // let your_rating=Req.body.your_rating
    // let Image=Req.body.Image
    let Query=`insert into movies (movie_name,movie_year,imdb_rating) values('${movie_name}','${movie_year}','${imdb_rating}')`
    Db.query(Query,(Err,Result)=>{
        if(Err){console.log('cannot post data',Err)}
        else{
            Res.send(Result)
        }
    })
})

// App.post("/rating/:id",(Req,Res)=>{
//     let Gid=Req.params.id
//     let rating=Req.body.rating
//     let Query="SELECT movies.movie_id, movies.movie_name, rating.your_rating FROM movies INNER JOIN rating ON movies.movie_id = rating.movie_id and insert into rating ("
//     Db.query(Query,)
// })

//static post
// App.post("/rating/:id",(Req,Res)=>{
//     let Gid=Req.params.id
//     let rating=Req.body.rating
//     let Query='INSERT INTO `rating`(`rating`, `movie_id`) VALUES (9,2)' 
//     Db.query(Query,(Err,Result)=>{
//         if(Err){console.log('cannot post data',Err)}
//         else{
//             Res.send(Result)
//         }
//     })
// })

App.post("/rating/:id",(Req,Res)=>{
    let Gid=Req.params.id
    let rating=Req.body.rating
    let Query=`INSERT INTO rating(rating,movie_id) VALUES ('${rating}','${Gid}')`
    Db.query(Query,(Err,Result)=>{
        if(Err){console.log(Err)}
        else{
            Res.send(Result)
        }
    })
})



App.delete("/movies/:id",(Req,Res)=>{
    let Gid=Req.params.id
    let Query=`delete from movies where movie_id=${Gid}`
    Db.query(Query,(Err,Result)=>{
        if(Err){
            console.log('cannot get data of id',Err)}
            else(
                Res.send(Result)
            )
    })
})




//update
App.put("/movies/:id",(Req,Res)=>{
    let Gid=Req.params.id
    let movie_name=Req.body.movie_name
    let movie_year=Req.body.movie_year
    let imdb_rating=Req.body.imdb_rating
    let Query=`Update movies set movie_name= '${movie_name}',movie_year='${movie_year}',imdb_rating='${imdb_rating}' where movie_id=${Gid}`
    Db.query(Query,(Err,Result)=>{
        if(Err){
            console.log("cannot update data",Err)}
            else(
                Res.send(Result)
            )
        })
    })





const Port=3301
App.listen(Port,()=>{
    console.log('app listening to port',Port)
})



// SELECT *
// FROM movies
// INNER JOIN rating
// ON movies.movie_id = rating.movie_id;