class ViewQueryModel{
    constructor(view, then, JSONFilter, page, pageSize, orderBy, orderDirection, rowSelections) {
        this.view = view;
        this.then = then;
        this.JSONFilter = JSONFilter;
        this.page = page;
        this.pageSize = pageSize;
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
        this.rowSelections = rowSelections;
    }
}
module.exports = ViewQueryModel;