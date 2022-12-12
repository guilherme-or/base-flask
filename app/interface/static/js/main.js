/**
 * 
 * UTILITARIES
 * 
 */

/**
 * 
 * @param {Array} data 
 * @param {Number} length Splice/Shift length
 * @returns {Array} Spliced data array 
 */
function spliceData(data, length) {
    let splicedData = [];
    for (let i = 0; i < length; i++) {
        splicedData.push(data.shift());
    }
    return splicedData;
}

/**
 * 
 * @param {String} btnClasses 
 * @param {String} btnId 
 * @param {String} btnOnClick 
 * @param {String} btnTitle 
 * @param {Array} children Elements to be appended to the button
 * @returns {Element} Button with Classes, Id, onClick Function, Title and Children Elements
 * 
 */
function createButton(btnClasses, btnId = '', btnOnClick = '', btnTitle = '', children = '') {
    let btn = $(document.createElement('btn'))
        .addClass(btnClasses)
        .attr('id', btnId)
        .attr('onclick', btnOnClick)
        .attr('title', btnTitle);

    btn.append(children);

    return btn;
}

/**
 * 
 * @param {String} tableId 
 * @param {String} tableClasses 
 * @returns {Element} Structured Table
 * 
 */
function createTable(tableId, tableClasses) {
    let table = $(document.createElement('table'))
        .addClass(tableClasses)
        .attr('id', `${tableId}`);

    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table
        .append(thead)
        .append(tbody);

    return table;
}

/**
 * 
 * @param {Element} table 
 * @param {String} tableElement 
 * @param {String} elementType 
 * @param {Array} data 
 * 
 */
function fillTableElement(table, tableElement, elementType, data) {
    let tr = document.createElement('tr');

    data.forEach(dataValue => {
        let tableValue = dataValue == null ? '' : dataValue;
        tableValue = typeof tableValue === 'object' ? tableValue[0] : tableValue;

        const element = document.createElement(elementType);
        element.append(tableValue);

        tr.append(element);
    });

    table.children(tableElement).append(tr);
}

/**
 * 
 * @param {Element} table 
 * @param {JSON} data 
 * @param {Object} options Options (Number dataSpliceLength, Array customHeaders, CallableFunction customActions)
 * 
 */
function fillTable(table, data, options) {
    // Initialize options
    const defaultOptions = {
        dataSpliceLength: 0,
        customHeaders: [],
        customAction: (values, splicedData) => { }
    }

    options = Object.assign(defaultOptions, options);

    // Define table headers
    let headers = options.customHeaders.length == 0 ? Object.keys(data[0]) : options.customHeaders;

    // Splice data from headers
    spliceData(headers, options.dataSpliceLength);

    // Add last header "Actions"
    // headers.push('Actions');

    // Fill table headers
    fillTableElement(table, 'thead', 'th', headers);

    // Loop through table data
    data.forEach(row => {
        const values = Object.values(row);

        const splicedData = spliceData(values, options.dataSpliceLength);

        options.customAction(values, splicedData);

        fillTableElement(table, 'tbody', 'td', values);
    });

}

// document.ready function
$(() => {
    $('#loader').hide();

    jQuery.ajaxSetup({
        beforeSend: function () {
            $('#loader').show();
        },
        complete: function () {
            $('#loader').hide();
        },
        success: function () {
            $('#loader').hide();
        }
    });
});

// jquery put and delete declaration
jQuery.each(["put", "delete"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});