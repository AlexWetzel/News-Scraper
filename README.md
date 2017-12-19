# RuneScrape

Link: https://fathomless-wave-80938.herokuapp.com/

RuneScrape is a web application that scrapes news articles from the RuneScape official site, and allows users to comment on them.

RuneScape is a multiplayer online fantasy game.

## Guide

### Scraping Articles

Using RuneScrape is simple. On the home page, click the 'scrape' button in the middle of the page. Once it's clicked, the server scrapes the RuneScape news page (http://services.runescape.com/m=news/a=13/), and page will refresh. The page will dispay any articles that were scraped, but articles that were scraped multiple times will only appear once.

Sometimes the page will refresh before the database is finished updating with the scraped articles. In this case refresh the page again to see the new articles.

### Saving Articles

Articles on the home page will have a green 'save' button. When you click 'save', the article will dissapear off the home page, but will he added to the 'my articles' page, which you can access from the navigation bar. Note that rticles on this page are shared across all users.

### Adding Notes (Work In Progress)

This feature is incomplete. For saved articles, clicking the 'note' button adds a note to the article, with the text "This is a note".

Once finished, you'll be able to add any text to the notes section of each article, and you'll be able to delete notes.


