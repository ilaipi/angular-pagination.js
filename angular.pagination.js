/**
 * 分页类
 * end to first : 向前
 * first to end : 向后
 * pageNum从0开始，第一页直接调用next()
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

    /**
     * 下一页数据
     */
    this.next = function($http) {
        this.pageNum = this.pageNum + 1;
        return this.current($http);
    };

    /**
     * 上一页数据
     * @param $http
     */
    this.previous = function($http) {
        this.pageNum = this.pageNum - 1;
        return this.current($http);
    };

    /**
     * 跳到指定页面
     * @param $http
     * @param pageNum 并不会检查有效性
     */
    this.go = function($http, pageNum) {
        this.pageNum = pageNum;
        return this.current($http);
    };

    /**
     * 当前页码的数据
     * @param $http
     * @returns {*}
     */
    this.current = function($http) {
        var self = this;
        return $http.get(this.uri + '?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize).then(function(response) {
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
