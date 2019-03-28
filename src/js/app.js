let vm = new Vue({
    el: '#app',
    data: {
        resume: {
            name: 'yyh',
            gender: '男',
            age: '20',
            job: '前端工程师',
            email: '12332@qq.com',
            phone: '2348923758',
            
        },
        loginVisible:false,
        signUpVisible:false
    },
    methods: {
        onEdit(key, value, x) {
            console.log(x)
            this.resume[key] = value
        },
        clickSave(){
            let currentUser = AV.User.current()
            if(!currentUser){
                this.loginVisible = true
            }else{
                this.saveResume()
            }
        },

    }
})