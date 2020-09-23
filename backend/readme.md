# Backend

## Endpoints

- /TBD
    - crawls polytehniques webiste to get all classes and their respective schedules
    - Get all classes, with all section, hours, days and class location for TH and TP/TD

## Models

  - calendar: calendar that stores array of weeks
  - weeks: arrays of days, with each week having 7 days with their properties
  - days: holday a single day with alternace (B1/B2), the date and the value(1 for weekday aand 0 for vac, week-ends)
  - class: represents a class with name and their schedule
  - semester: holds the name, start, endate, array of classes and a calendar

## Dependancies
  
  - *nodejs*: need i say more
  - *express*: basic backend infrastructure for nodejs
  - *axios*: for HTTP requests
  - *cheerio*: Core Jquery features for backend
  - *fs*: writing json to disk
