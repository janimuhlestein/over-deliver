$(':radio').change(function () {
    let str = this.closest('h2').textContent;
    str = str.replace("&nbsp", "").slice(0, -15).trim().slice(0, -1).toLowerCase();
    console.log(str + this.value);
    this.closest('div').id = str;
    this.closest('div').title = this.value;
});