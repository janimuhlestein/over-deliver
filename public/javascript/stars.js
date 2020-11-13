$(':radio').change(function () {
    let str = this.closest('h2').textContent;
    str = str.replace("&nbsp", "").slice(0, -15).trim().slice(0, -1).toLowerCase();
    this.closest('div').id = str;
    this.closest('div').title = this.value;
});
