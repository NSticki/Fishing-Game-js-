let vm = new Vue({
    el: '#aqua',
    data: {
        name:'',
        counter: 0,
        counters: [],
        field: [],
        newID: 0,
        newIndex: 0,
        currentTime: 30,
        timer: null,
        gamer: null,
        autoDel: null,
        flag: false,
        hide: false
    },
    methods: {
        fishAdd() {
            this.field.splice(this.randomIndex(), 0, {id:this.newID++});
            this.gamer = setTimeout(function () {
                this.fishAdd()
            }.bind(this), 500)
         },

        deleteFish(index){
            this.field.splice(index, 1)
            this.counter += 10
        },

        startGame(){
            this.startTimer()
            this.fishAdd()
            this.counter = 0
            this.currentTime = 30
            this.field = []
            this.flag = true
        },

        randomIndex () {
            return Math.floor(Math.random() * this.field.length)
        },

        startTimer() {
            this.timer = setInterval(() => {
                this.currentTime--
            }, 1000)
        },

        stopTimer() {
            clearTimeout(this.timer)
            this.currentTime = 30
            this.field = []
            this.counters.push({
                counter: this.counter
            })
        },

        stopGame(){
            clearTimeout(this.gamer)
        },

    },
    watch: {
        currentTime(time) {
            if (time === 0) {
                this.flag = false
                this.stopTimer()
                this.stopGame()
            }
        },
        newID(id){
            if (id === 130){
                this.stopGame()
            }
        }
    },
})