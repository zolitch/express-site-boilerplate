##Views folder
=======

### IMPORTANT!!!

The views contained in the */modules* folder are dynamically built from the .handlebars templates contained in each module in:

*/client/modules/<module-name>/<module-name.handlebars>*

The reason for this is so to avoid duplicating module templates. 

.handlebars views in the app/views/ folder are rendered server side on page load for the FE site. 

.handlebars templates in the client/modules/ folder will be copied to the /dist folder. They will then be copied accross to the relevant folder in the production site to be packaged into Nuget. 
There is also the possibility that the templates may be used on the client side too in which case they may need to be named as .hbs for this eventuality.

###The shared, layouts and pages folder however are not dynamic. 
The shared folder contains shared views like header and footer which are used around the site but NOT as front-end views on the client site.

