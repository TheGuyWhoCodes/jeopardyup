# Jeop

This project was built for the Capital One Engineering Challenge. The given challenge was to create a site where you can browse the large collection of Jeoprady questions and filter out for certain criteria. An extra feature that I added was the simulation portion of the game. The service is built off of ruby and a MEAP stack.

I think this application is worthy of winning for a couple of reasons:

1. Application setup is very clean with not only the use of Angular, but the project setup in general
2. The API Controller for Ruby is heavily modified in order to take off client side filtering
3. Mobile friendly search with easy client side searching

The repository is split into two sections, the Angular server and Ruby API search.

This site *CANNOT* be used with the current jService.io service, we will need to install the modified version in order to run. The differences are:

1. Fixed min_date max_date 
2. keyword searching
3. Jeoprady simulation API call
4. Fixes to rails versions in order to run in 2019 instead of 2015 :(
# Angular Setup

To install and run the application, we need to run:
`$ npm install`
to install any dependencies for the application. Then we can run an 
`$ ng serve` to run the application.

# Ruby Application Setup
* run `bundle install` 
* run `rails s`
* Either import the db (included) or run `rake get_clues[1,31]` -- NOTE: this will grab approx 130K clues and takes a while. The arguments here are the range of season you want to grab. You can save some time and grab only current season by doing something like `rake get_clues[20,31]`, which would only get seasons 20 through 31
* visit `http://localhost:3000/clues` or view `config\routes.rb` file for more
* shoot me a pull request to the readme with your app in the wild!
