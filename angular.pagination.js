/**
 * 分页类
 * end to first : 向前
 * first to end : 向后
 * Created by yyam on 15-6-25.
 */
function AngularPagination(uri, pageNum, pageSize) {
    /**
     * 当前页码
     */
    this.pageNum = pageNum;

    /**
     * 每页的数据量
     */
    this.pageSize = pageSize;

    /**
     * 数据地址
     */
    this.uri = uri;

    this.keyword = undefined;

    /**
     * 后端响应的总页数
     * @type {number}
     */
    this.pages = 0;

    /**
     * 后端响应的记录总数
     * @type {number}
     */
    this.total = 0;

    /**
     * 标记向前按钮是否可用
     * @type {boolean}
     */
    this.newer = false;

    /**
     * 标记向后按钮是否可用
     * @type {boolean}
     */
    this.older = false;

    /**
     * 标记跳到第一页按钮是否可用
     * @type {boolean}
     */
    this.toFirst = false;

    /**
     * 标记跳到最后一页按钮是否可用
     * @type {boolean}
     */
    this.toEnd = false;

    this.$http = null;

    this.params = null;

    /**
     * 下一页数据
     */
    this.next = function() {
        this.pageNum = this.pageNum + 1;
        return this.current();
    };

    /**
     * 上一页数据
     * @param $http
     */
    this.previous = function() {
        this.pageNum = this.pageNum - 1;
        return this.current();
    };

    this.goto = function(pageNum) {
        if(pageNum > this.pages) {
            return;
        }
        this.pageNum = pageNum;
        return this.current();
    }

    /**
     * 搜索框/搜索按钮
     * 自动跳到第一页
     * @param event 搜索框的回车事件
     */
    this.search = function(event) {
        if(event) {
            if(event.keyCode != 13) {
                return;
            }
        }
        this.goto(1);
    };

    this.first = function() {
        this.goto(1);
    };

    this.end = function() {
        this.goto(this.pages);
    };

    this.go = function(event) {
        if(event) {
            if(event.keyCode != 13) {
                return;
            }
            var pageNum = event.target.value;
            return this.goto(pageNum);
        }
    };

    /**
     * 当前页码的数据
     * @param $http
     * @returns {*}
     */
    this.current = function() {
        var self = this;
        var url = this.uri;
        this.params = {};
        this.params['pageNum'] = this.pageNum;
        this.params['pageSize'] = this.pageSize;
        if(this.keyword) {
            this.params['keyword'] = this.keyword;
        }
        return this.$http.post(url, this.params).then(function(response) {
            self.config = response.data;
            self.pages = self.config.pages;
            self.total = self.config.total;

            //如果总记录数为0，则设置当前页码为0
            if(self.total == 0) {
                self.pageNum = 0;
            }

            if(self.pageNum > 1) {
                self.toFirst = true;
                self.older = true;
            } else{
                self.toFirst = false;
                self.older = false;
            }

            if(self.pageNum == self.pages) {
                self.newer = false;
                self.toEnd = false;
            } else{
                self.newer = true;
                self.toEnd = true;
            }
            return self;
        });
    };
}
