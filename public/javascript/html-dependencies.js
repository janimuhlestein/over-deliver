// stars
$(':radio').change(function () {
    let str = this.closest('h2').textContent;
    str = str.replace("&nbsp", "").slice(0, -15).trim().slice(0, -1);
    console.log(str + ' star rating: ' + this.value);
});

// tooltips
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'left'
    })
});

// modals