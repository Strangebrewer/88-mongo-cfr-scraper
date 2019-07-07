# CFR Scraper

Bootcamp assignment using MongoDB and Mongoose. This is my MongoDb Web Scraper for the Council on Foreign Relations (CFR) "In the News" section - a listing of academic papers, editorials, and other media appearances by CFR fellows and experts. Scraped data includes article titles and links to each article, the date of publication, and links to CFR's sections on the broader context topics for each article, linked at the top of each article. Articles are scraped from https://www.cfr.org/in-the-news and saved to a Mongo database. Articles can be marked as "Saved" and then viewed separately, and each saved article has a comments section. Saved articles can be discarded (which simply switches the "Saved" boolean to false), returning them to the main list. You can check it out [here](https://o88-mongo-cfr-scraper.herokuapp.com/).

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
