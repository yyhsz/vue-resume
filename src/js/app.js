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
        loginVisible: false, //登陆
        signUpVisible: false,//注册
        signUp: {
            userName: '',
            password: '',
            matchPassword: '',
        },
        login: {
            userName: '',
            password: '',
        }
    },
    methods: {
        onEdit(key, value, x) {
            console.log(x)
            this.resume[key] = value
        },
        clickSave() {
            let currentUser = AV.User.current()
            if (!currentUser) {
                this.loginVisible = true
            } else {
                this.saveResume(AV.User.current().id)
            }
        },
        saveResume(id){
            var user = AV.Object.createWithoutData('User', id);
            user.set('resume',this.resume);
            user.save();
        },
        onSignUp(e) {
            let user = new AV.User();
            user.setUsername(this.signUp.userName);
            user.setPassword(this.signUp.password);
            user.signUp().then((loggedInUser) => {
                this.signUp.userName = '';
                this.signUp.password = '';
                this.signUp.matchPassword = '';
                this.loginVisible = true;
                this.signUpVisible = false;
                AV.User.logOut();
            }).catch((x) => {
                console.log(x)
            })
        },
        onLogin(e) {
            AV.User.logIn(this.login.userName, this.login.password).then(function (loggedInUser) {
                console.log(loggedInUser);
                this.loginVisible = false;
            }).catch(function (error) {
                if(error.code === 211) alert('用户名不存在')
            });
        },
        onLogout(){
            AV.User.logOut();
            window.location.reload()
        }

    }
})



