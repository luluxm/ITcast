let tools = {

    //保存当前的商品进入到localStorage
    //tools.add({num:num,id:this.info.id})
    addOrUpdate: function(prod) {

        let prods = this.getProds();


        //判断当前数量是-数，就是删除了商品，清除该key,重新保存
        if (prod.num < 0) {
            delete prods[prod.id];
            return this.setProds(prods);

        }


        // prod.id && prod.num
        // 判断商品是否存在与prods对象中，如果存在，追加
        prods[prod.id] = prods[prod.id] ? prods[prod.id] + prod.num : prod.num;
        this.setProds(prods);
    },
    //存储购物车数据
    setProds(prods) {
        //存储在localStorage中，下次刷新需要能看到
        window.localStorage.setItem('prods', JSON.stringify(prods));
    },

    //获取prods对象
    getProds() {
        return JSON.parse(window.localStorage.getItem('prods') || '{}');
    },
    //删除元素并保存
    del(id) {
        let prods = this.getProds();

        // prods[id] = null;
        // 删除对象的key
        delete prods[id];
        //存储
        this.setProds(prods);
    },


    //获取所有商品的总数
    getTotalCount() {
        let prods = this.getProds();
        let sum = 0;
        for (var key in prods) {
            sum += prods[key];
        }

        return sum;
    },

}


export default tools;
