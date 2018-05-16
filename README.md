# RuneScrape

Link: https://fathomless-wave-80938.herokuapp.com/

RuneScrape is a web application that scrapes news articles from the RuneScape official site, and allows users to comment on them.

RuneScape is a multiplayer online fantasy game.

## Guide

### Scraping Articles

Using RuneScrape is simple. On the home page, click the 'scrape' button in the middle of the page. Once it's clicked, the server scrapes the RuneScape news page (http://services.runescape.com/m=news/a=13/), and page will refresh. The page will dispay any articles that were scraped, but articles that were scraped multiple times will only appear once.

Sometimes the page will refresh before the database is finished updating with the scraped articles. In this case refresh the page again to see the new articles.

### Saving Articles

Articles on the home page will have a green 'save' button. When you click 'save', the article will dissapear off the home page, but will he added to the 'my articles' page, which you can access from the navigation bar. Note that articles on this page are shared across all users.

### Adding Notes

For saved articles, clicking the 'note' button opens a text form. From there, you can type a message to add to the saved article, or close the form by clicking 'cancel'.

You can delete note by clicking the red 'x' icon next to it.