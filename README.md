# EcomplyChallenge

### Page layout

Regarding the layout, I took inspiration from the design shown in the picture on the Ecomply website that alludes to the Logbook.
Of course, much more simply, only to resemble it a little.

### Project structure

I created a basic structure, including a module for monthly active users called 'mau' and a component called chart that contains all of the site's data, including its buttons, title, and graphics.

To do the layout (html and css), I made a folder named page/mau. On this page, I'm calling the chart component.

Additionally, I made an interface file inside the module folder so to be able to type the JSON.

And services folder, for http requests rules.

### Project logic

The project asked to make a graph showing the number of active users in the last 7 days or 30 days. In addition, it left the choice of a date selector as optional.

I chose not to do it with the selector, but only what was mandatory, which was the result of the last 7 and 30 days.

When loading the page, it already defined the return of the result of the last 30 days.

When my JSON is successfully returned, the function `this.renderChart(this.filter);` is called, which creates the graph on the screen. I used the ngx-echarts lib to create the graph.

There are two buttons on the website, each of which sets the search parameters and calls the method renderChart(params:) with the days: 7 or months: 1 parameters. I used the data-fns library, which offers this type of params value.

When the function `renderChart` first receives a parameter, it sets the `filter` parameter's value.

The `chartData` value is then defined as the result of the `getChartData()` method, and the graph is created using that data.

The function `getChartData()` is used to generate the data needed to create the chart.

In it, I create a new object where I iterate through the filtered list produced by `getRangedData()`, format the date using the format "yyyy-MM-dd," and use the JSON date as the object's key. Then, I check to see if that date(key) is in the `newDataList`, and if it isn't, it adds the date as a key and the `user_id` number as its value. If that date already exists in the object, a fresh check is made to see if the `user_id` exists as well. If it doesn't, a new `user_id` number is added, and so on.

I receive an object at the conclusion with dates as keys and `user_id` numbers as values.

Since only unique users entered this list, I have the total number of users for that day. With that, in the `renderChart()` function, I get the values of the X axis (data) by calling `Object.keys`, which returns the key values.
