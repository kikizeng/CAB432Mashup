const axios = require('axios').default;
var express = require('express');
const { response } = require('../app');
var router = express.Router();

// router.post('/', function (req, res) {
//     let recipeResult = req.body.searchRe;
//     let cityResult = req.body.searchCi;
//     console.log(recipeResult);
//     console.log(cityResult);
//     const base = 'https://www.themealdb.com/api/json/v1/1/search.php';
//     const query = `?s=${recipeResult}`;
//     const url = base + query;

//     axios
//         .get(url)
//         .then((resp) => {
//             console.log("TEST TEST");
//             let { data } = resp;
//             /////// axios again with resp.something
//             // console.log(JSON.stringify(data));
//             console.log(data.meals[0].strArea);
//             res.send(data.meals[0].strArea);
//             // res.render('Recipes:', { display })
//         })
//         .catch((error) => {
//             console.log(error.toJSON());
//         });
// });

router.post('/', function (req, res) {
    let recipeResult = req.body.searchRe;
    let cityResult = req.body.searchCi;
    // test if get result back
    console.log(recipeResult);
    console.log(cityResult);
    const APP_ID_REC = '1ee8a3fb';
    const API_KEY_REC = 'fc7f239a9af0ec37b8508bc7ce8a8f8a';
    const APP_ID_N = '8f858169';
    const API_KEY_N = '23a7f4cbaa5118ccac0ca355941c9872';
    // https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10&calories=591-722&health=alcohol-free"
    const base1 = 'https://api.edamam.com/search';
    const q1 = `?q=${recipeResult}`;
    const app_id_1 = `&app_id=${APP_ID_REC}`;
    const app_key_1 = `&app_key=${API_KEY_REC}`;
    const range_1 = '&from=0&to=1';
    const url_1 = base1 + q1 + app_id_1 + app_key_1 + range_1;
    //const base2 = 'https://developer.edamam.com/edamam-docs-nutrition-api?';
    const base2 = "https://api.edamam.com/api/nutrition-details?";
    const app_id_2 = `&app_id=${APP_ID_N}`;
    const app_key_2 = `app_key=${API_KEY_N}`;
    const url_2 = base2 + app_id_2 + app_key_2;

    axios.get(url_1)
        .then((resp) => {
            console.log("TEST TEST");
            let { data } = resp;
            console.log(data.hits[0].recipe.label);
            console.log(` data hits[0] recipe: ${data.hits[0].recipe}`) // how about the ingridients part??
            // let recipeTitle = data.hits[0].recipe.label;
            // let recipeIngr = data.hits[0].recipe.ingredients;
            const BASE_URL = "https://api.edamam.com/api/nutrition-data";
            // GET Request
            // constructing the url
            const POST_API_KEY = '23a7f4cbaa5118ccac0ca355941c9872';
            const POST_APP_ID = '8f858169';
            const GET_URL = `${BASE_URL}?app_key=${POST_API_KEY}&app_id=${POST_APP_ID}&ingr=${encodeURI(data.hits[0].recipe.ingredients[0].text)}`;
            axios.get(GET_URL)
                .then((response) => { // what data are u going to extract??, just need to display the calories from the second API
                    let { data } = response;
                    if (response.status == 200) {
                        console.log(`calories = ${data.calories}`);
                        res.render('recipe', { calories: data.calories });
                        //res.send(data.calories)//the the brower displayed "OK" yeah you have to render it 
                    } else {
                        res.render('error', { status: 400 });
                    }
                }).catch((err) => { // error handling, if no error handing the "resp" wont send?
                    res.render('error', { status: 400 });
                })

            // // contructing the POST Request needed param, data and URL
            // // the API key and app ID was correct



            // const POST_URL = `${BASE_URL}?app_key=${POST_API_KEY}&app_id=${POST_APP_ID}`;

            // const config = {
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // }


            // // get the ingridients
            // let ingredients = [];
            // data.hits[0].recipe.ingredients.map((ing) => {
            //     ingredients.push(ing.text) // 
            // })
            // // construct the data to be sent
            // const post_data = {
            //     "title": data.hits[0].recipe.label,
            //     "ingr": ingredients // done
            // }

            // // make a POST request
            // axios.post(POST_URL, post_data, config)
            //     .then((res) => {
            //         let { data } = res;
            //         if (res.status == 200) { // if response is ok
            //             console.log(data);
            //         } else { // how about if I try with the get reques? ok

            //             // error handling -- show error Page
            //             res.render('error');

            //         }
            //     }).catch((err) => {
            //         console.log(err);
            //     })

            // // make a post request
            // axios({
            //     method: 'post',
            //     url: url_2,
            //     data: {
            //         title: data.hits[0].recipe.label, //is that possible because of my querry is wrong?
            //         ingr: data.hits[0].recipe.ingredients
            //     },
            //     headers: {
            //         "Content-Type": "application/json" 
            //     }
            // }).then((response) => {
            //     console.log("TEST AGAIN!!!");
            //     let { data } = response;
            //     console.log(data.calories);
            //     res.send(data.calories);
            // })
            // res.send(data.hits[0].recipe.label);
            //attach image as well later: data.hits[0].recipe.image
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = router;
// yes, its awsome tool