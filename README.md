# Coffee Shop Analysis

## Introduction

This is an analysis modeled after [Mo Chen's YouTube video "The ONLY EXCEL
PORTFOLIO PROJECT YOU NEED"][1]. His analysis was done using Excel, which I also
did.  However, I decided to reproduce the analysis to produce a webpage instead
of a Workbook.

## Process

The Python script, main.py performs the data loading, cleaning, and
transformation.  Of note is the lack of pandas.  Raymond Hettinger, in a talk
called [The Mental Game of Python][2], advocates the use of the built-in Python
datatypes like lists, sets, and dictionaries, to perform data analysis.  Since
the dataset used for this project is small, I followed his advice.

The data is read from an Excel workbook using the [openpyxl][3] library.  Order,
customer, and product data are joined using dictionaries.  Data is then written
directly into a JavaScript file for use in a webpage to display the analysis.

The webpage uses the Plotly JavaScript library to draw plots using data that was
written into the JavaScript file.  I added code to handle the slicers for
Order Year, Roast Type, Size, and Loyalty Card.  When the buttons are pushed,
code in plot.js will filter data and redraw the plots in the web page.  This
simulates the behavior of slicers in Excel or Power BI.

[1]: https://www.youtube.com/watch?v=m13o5aqeCbM
[2]: https://www.youtube.com/watch?v=Uwuv05aZ6ug
[3]: https://pypi.org/project/openpyxl/