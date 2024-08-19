// JavaScript to draw plots

const ORDER_DATE = 0;
const CUSTOMER_NAME = 1;
const COUNTRY = 2;
const LOYALTY_CARD = 3;
const COFFEE_TYPE = 4;
const ROAST_TYPE = 5;
const SIZE = 6;
const SALES_AMOUNT = 7;

// Filter variables
let yearFilters = [];
let roastFilters = [];
let sizeFilters = [];
let loyaltyFilters = [];

const BASE_CONFIG = {
    responsive: true,
}

function init() {
    drawAllPlots();
}

function filterData() {
    let selectedData = coffeeData;
    if (yearFilters.length > 0) {
        selectedData = selectedData.filter((row) => yearFilters.includes(row[ORDER_DATE].substring(0, 4)));
    }
    if (roastFilters.length > 0) {
        selectedData = selectedData.filter((row) => roastFilters.includes(row[ROAST_TYPE]));
    }
    if (sizeFilters.length > 0) {
        selectedData = selectedData.filter((row) => sizeFilters.includes(row[SIZE]));
    }
    if (loyaltyFilters.length > 0) {
        selectedData = selectedData.filter((row) => loyaltyFilters.includes(row[LOYALTY_CARD]));
    }
    return selectedData;
}

function drawAllPlots() {
    const selectedData = filterData();
    drawTotalSalesPlot(selectedData);
    drawSalesByCountryPlot(selectedData);
    drawTop5CustomersPlot(selectedData);
}

function drawTotalSalesPlot(selectedData) {
    const traces = []
    let X = Array.from(new Set(selectedData.map((row) => row[ORDER_DATE]))).sort();

    for (coffeeType of coffeeTypes) {
        const coffeeSalesByDate = {};
        for (let row of selectedData) {
            if (row[COFFEE_TYPE] == coffeeType) {
                let orderDate = row[ORDER_DATE];
                let salesAmount = row[SALES_AMOUNT];
                if (coffeeSalesByDate.hasOwnProperty(orderDate)) {
                    coffeeSalesByDate[orderDate] += salesAmount;
                } else {
                    coffeeSalesByDate[orderDate] = salesAmount;
                }
            }
        }
        const Y = [];
        for (let orderDate of X) {
            if (coffeeSalesByDate.hasOwnProperty(orderDate)) {
                Y.push(coffeeSalesByDate[orderDate]);
            } else {
                Y.push(0);
            }
        }

        const trace = {
            x: X,
            y: Y,
            name: coffeeType
        };

        traces.push(trace);
    }

    const layout = {
        title: 'Total Sales Over Time',
        // height: 595,
        // width: 900,
    };

    const config = {
        ...BASE_CONFIG,
    };

    Plotly.react('total-sales-plot', traces, layout, config);
}

function drawSalesByCountryPlot(selectedData) {
    // Summarize data by country
    const salesByCountry = {};
    const Y = [];
    for (let row of selectedData) {
        const country = row[COUNTRY];
        const salesAmount = row[SALES_AMOUNT];
        if (salesByCountry.hasOwnProperty(country)) {
            salesByCountry[country] += salesAmount;
        } else {
            Y.push(country);
            salesByCountry[country] = salesAmount;
        }
    }

    // Sort by sales in descending order
    Y.sort((a, b) => salesByCountry[a] - salesByCountry[b]);

    const X = [];
    for (let country of Y) {
        X.push(salesByCountry[country])
    }

    const trace = {
        x: X,
        y: Y,
        type: 'bar',
        orientation: 'h'
    };

    const layout = {
        title: "Sales by Country",
        // height: 225,
        // width: 600,
        yaxis: {
            automargin: true,
        }
    };

    const config = {
        ...BASE_CONFIG,
    };

    Plotly.react('sales-by-country-plot', [trace], layout, config);
}

function drawTop5CustomersPlot(selectedData) {
    // Summarize data by customer
    const salesByCustomer = {};
    const customerNames = [];
    for (let row of selectedData) {
        const customer = row[CUSTOMER_NAME];
        const salesAmount = row[SALES_AMOUNT];
        if (salesByCustomer.hasOwnProperty(customer)) {
            salesByCustomer[customer] += salesAmount;
        } else {
            customerNames.push(customer);
            salesByCustomer[customer] = salesAmount;
        }
    }

    // Sort by sales in descending order
    customerNames.sort((a, b) => salesByCustomer[b] - salesByCustomer[a]);
    // Choose top 5
    const Y = customerNames.slice(0, 5).reverse();
    const X = [];
    for (let customer of Y) {
        X.push(salesByCustomer[customer])
    }

    const trace = {
        x: X,
        y: Y,
        type: 'bar',
        orientation: 'h'
    };

    const layout = {
        title: 'Top 5 Customers',
        // height: 300,
        // width: 600,
        yaxis: {
            automargin: true,
        }
    };

    const config = {
        ...BASE_CONFIG,
    };

    Plotly.react('top-5-customers-plot', [trace], layout, config);
}

function setFilter(buttonElem, filterName, filterValue) {
    if (filterName == 'year') {
        if (yearFilters.includes(filterValue)) {
            yearFilters = yearFilters.filter(t => t !== filterValue);
            buttonElem.classList.remove('active-filter');
        } else {
            yearFilters.push(filterValue);
            buttonElem.classList.add('active-filter');
        }
    } else if (filterName == 'roast') {
        if (roastFilters.includes(filterValue)) {
            roastFilters = roastFilters.filter(t => t !== filterValue);
            buttonElem.classList.remove('active-filter');
        } else {
            roastFilters.push(filterValue);
            buttonElem.classList.add('active-filter');
        }
    } else if (filterName == 'size') {
        if (sizeFilters.includes(filterValue)) {
            sizeFilters = sizeFilters.filter(t => t !== filterValue);
            buttonElem.classList.remove('active-filter');
        } else {
            sizeFilters.push(filterValue);
            buttonElem.classList.add('active-filter');
        }
    } else if (filterName == 'loyalty') {
        if (loyaltyFilters.includes(filterValue)) {
            loyaltyFilters = loyaltyFilters.filter(t => t !== filterValue);
            buttonElem.classList.remove('active-filter');
        } else {
            loyaltyFilters.push(filterValue);
            buttonElem.classList.add('active-filter');
        }
    }
    drawAllPlots();
}

init();