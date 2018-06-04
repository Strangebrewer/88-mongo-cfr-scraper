# 88-mongo-cfr-scraper
  
## Table of contents
  
### 1-Description
### 2-Technologies
### 3-Challenges
### 4-Issues

### 1-Description
This is my MongoDb Web Scraper for the Council on Foreign Relations (CFR) "In the News" section - a listing of academic papers, editorials, and other media appearances by CFR fellows and experts. Scraped data includes article titles and links to each article, the date of publication, and links to CFR's sections on the broader context topics for each article, linked at the top of each article. Articles are scraped from https://www.cfr.org/in-the-news and saved to a Mongo database. Articles can be marked as "Saved" and then viewed separately, and each saved article has a comments section. Saved articles can be discarded (which simply switches the "Saved" boolean to false), returning them to the main list.

### 2-Technologies
  This project utilizes the following technologies:
- HTML
- CSS
- Vanilla JavaScript
- [jQuery](https://jquery.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- AJAX
- Responsive Design
- [Handlebars](https://handlebarsjs.com/)
- [Heroku](https://www.heroku.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose.js](http://mongoosejs.com/)
- [Cheerio](https://www.npmjs.com/package/cheerio)

### 3-Challenges
The purpose of this project was primarily to learn the basics of building Schemas and performing CRUD operations using MongoDb and Mongoose.js. Using Cheerio to parse the scraped html document and access the elements was a learning experience as well, though, again, MongoDb and Mongoose were the primary learning objectives. This project also served as further practice with the MVC framework, Node/Express servers, routes, and of course the fundamentals: HTML, CSS, and JavaScript.

### 4-Issues
  Currently there are no known issues that need to be resolved (unless CFR has an objection to their website being scraped...). If you find an issue please submit it using the issues tab, or contact [Keith Allmon](https://github.com/Strangebrewer/).