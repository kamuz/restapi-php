//POST REQUEST

$(document).ready(function() {
    $('#postMessage').click(function(e) {
        e.preventDefault(); // Prevent default form submission

        // Read form fields into a JavaScript object
        var formData = {};
        $('form').serializeArray().forEach(function(item) {
            formData[item.name] = item.value;
        });

        // Send data as JSON via AJAX POST
        $.ajax({
            type: "POST",
            url: "https://restapi.loc/api/post/create.php",
            data: JSON.stringify(formData), // Convert object to JSON string
            contentType: "application/json", // Set correct content type

            success: function() {
                alert('Successfully posted');
            },
            error: function() {
                alert('Could not be posted');
            }
        });
    });
});


//GET REQUEST

$(document).ready(function() {
    $('#getMessage').on('click', function() {

        // Make GET request for JSON data
        $.getJSON('https://restapi.loc/api/post/read.php', function(response) {

            // Limit posts
            const filtered = response.data.filter(item => item.id <= 4);

            // Generate HTML from filtered data
            const html = generateHtml(filtered);

            // Insert the generated HTML into the DOM
            $('.message').html(html);

        }).fail(function(jqXHR, textStatus, errorThrown) {
            // Handle AJAX errors
            console.error('AJAX error:', textStatus, errorThrown);
        });
    });

    /**
     * Converts an array of post objects into HTML markup.
     */
    function generateHtml(dataArray) {
        return dataArray.map(item => {
            let rows = '';
            $.each(item, function(key, value) {
                rows += `<strong>${key}</strong>: ${value}<br>`;
            });
            return `<div class="cat">${rows}</div><br>`;
        }).join('');
    }
});