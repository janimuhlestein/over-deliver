$(':radio').change(function () {
    console.log(this.closest('h2').textContent.slice(0, -16) + ' star rating: ' + this.value);
});