# YelpCamp

## Initial Setup
* Add Landing Page
* Add Campground Page that lists all campgrounds

## Layout and Styling
* EJS-mate layout to creating boilerplates for header and footer partials
* Bootstrap 5

## Set up Campground
#### Pages
* Show campgrounds
* Create campground
* Edit campground
* Delete campground
#### Review Functionality
* Created Reviews model
* Added review form for campground
* Validate review on Client Side and Server Side
* User can rate campgrounds
* Using startability css for rating stars
#### Image Upload
* Using Cloudinary to store images
* Store image url to MongoDB

## Error handle for Client-Side and Server-Side
* Client-Side Form validation
* Custom ErrorHandler Class
* JOI Schema Validation Middleware

## Added Connect-Flash
* Created Flash messages using Bootstrap alert
* Added 'success' and 'error' for displaying flash messages
* Refactor into middleware

## User Authentication
* Added User authentication using Passport (authentication middleware for Node)
* Added Registration, Login, Logout page
* Added returnTo behavior (remember last stage of user, and redirect back to the page once logged in)

## Middleware
* Connect-Flash - session used for storing messages
* Multer - for parsing formData

## Modules
* Dotenv - loads environment variables from .env file to porocess.env
* Multer Storage Cloudinary

## Virtual Property
* For modifying the path in the url

## Tools
* Mapbox - Forward geocoding
* Mapbox GL - For map
* Custer map