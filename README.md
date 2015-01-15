##Stadion Front end
=======

Front-end site for Stadion Digital Sports platform

###  Folder structure

### Build
#### Develpment build.
Build step to generate compiled css and javascript to run this front-end site.
Source mappings etc enabled
- dest : /build

#### Production asset generation
Build step to generate:
Base css asset - containing base styles, structure, branding etc.
    - src: /client/styles
Module css assets - Individual assets
    - src: /client/modules/<module_name>/<module_name>.styl

Seperate css and javascript assets for the platform will be sent to dest folder. These can then be copied to the production site. (Located outside of this solution)

#### Production assets build
Build step to combine and minify generated assets. This will run on the production site and create single js and css assets.