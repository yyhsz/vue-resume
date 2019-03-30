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
            skills:[
                {name:'技能名称',description:'技能描述'},
                {name:'技能名称',description:'技能描述'},
                {name:'技能名称',description:'技能描述'},
                {name:'技能名称',description:'技能描述'},
                
            ],
            works:[
                {name:'项目名称',keywords:'关键词',description:'xxxxxxxxxx',link:'httpxxxxxxx',preview:'httpxxxxxxx'},
                {name:'项目名称',keywords:'关键词',description:'xxxxxxxxx',link:'httpxxxxxxx',preview:'httpxxxxxxx'},            
            ],
        },
        shareVisible:false,
        shareUrl:'',
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
        },
        currentUser:{
            id:'',
            username:'',
        }
    },
    methods: {
        onEdit(key, value, x) {
            if(key.indexOf("[")===-1){
                this.resume[key] = value
            }else{
                key = key.replace(/\[(\d+)\]/,(match,number)=>`.${number}`)
                keys = key.split('.')
                let result = this.resume
                console.log(keys)
                keys.forEach((v,k)=>{
                    if(k===2){
                        result[v] = value
                    }else{
                        result = result[v]
                    }
                })
                
            }
        },
        clickSave() {
            if (!AV.User.current()) {
                this.loginVisible = true
            } else {
                this.saveResume(AV.User.current().id)
            }
        },
        saveResume(id){
            var user = AV.Object.createWithoutData('User', id);
            user.set('resume',this.resume);
            user.save()
                .then(()=>{
                    alert('保存成功')
                }).catch(()=>{
                    alert('保存失败')
                })
        },
        onSignUp(e) {
            let user = new AV.User();
            user.setUsername(this.signUp.userName);
            user.setPassword(this.signUp.password);
            user.signUp().then((user) => {
                this.signUp.userName = '';
                this.signUp.password = '';
                this.signUp.matchPassword = '';
                this.loginVisible = false;
                this.signUpVisible = false;
                this.currentUser.id = user.id;
                this.currentUser.userName = user.attributes.username;               
                alert('注册成功，已登陆');
            }).catch((x) => {
                console.log(x)
            })
        },
        onLogin(e) {
            AV.User.logIn(this.login.userName, this.login.password).then((user)=>{
                this.loginVisible = false;
                let query = new AV.Query('User');
                query.get(user.id).then((user)=>{
                    if(user.attributes.resume){
                        Object.assign(this.resume,user.attributes.resume) 
                        console.log(this.resume)
                    }
                })
                alert('登陆成功')
            }).catch(function (error) {
                if(error.code === 211) alert('用户名不存在')
                if(error.code === 210) alert('密码错误')
            });
        },
        onLogout(){
            AV.User.logOut();
            [this.currentUser.id,this.currentUser.email] = ["",""]
            window.location.reload();
        },
        addSkill(){
            this.resume.skills.push({name:'技能名称',description:'技能描述'})
        },
        removeSkill(index){
            this.resume.skills.splice(index,1)
        },
        addWork(){
            this.resume.works.push(
                {name:'项目名称',keywords:'关键词',description:'xxxxxxxxxx',link:'httpxxxxxxx',preview:'httpxxxxxxx'},
            )
        },
        removeWork(index){
            this.resume.works.splice(index,1)
        },
        copy(){
            this.$el.querySelector('#copy').select()
            document.execCommand("Copy"); // 执行浏览器复制命令 
            alert("已复制好，可贴粘。");
        }

    },
    mounted(){
        if(AV.User.current()){
            [this.currentUser.id,this.currentUser.username] = [AV.User.current().id,AV.User.current().attributes.username]
            this.shareUrl = location.origin + location.pathname + '?user_id' + this.currentUser.id
            let query = new AV.Query('User');
            query.get(AV.User.current().id).then((user)=>{
                if(user.attributes.resume){
                    Object.assign(this.resume,user.attributes.resume) 
                }
            }).catch((error)=>{console.log(error)})
        }
    }
})



