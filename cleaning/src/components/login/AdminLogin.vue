<template>
    <div id="administratorLogin">
        <div id="adminLogin">
            <h1>Please Login</h1>
            <form>
                <div class="form-control">
                    <input type="text" required v-model="account" />
                    <label>Account</label>
                </div>
                <div class="form-control">
                    <input type="password" required v-model="adPwd" />
                    <label>Password</label>
                </div>
                <button type="button" class="btn" @click="Submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'AdminLoginPage',
        data(){
            return{
                account:'',
                adPwd:''
            }
        },
        mounted(){
            this.wave();
        },
        methods:{
            //登录
            Submit(){
                axios.post('http://localhost:8080/admin/login',`account=${this.account}&password=${this.adPwd}`).then(res=>{
                    //this.account=null;
                    //this.adPwd=null;
                    if(res.data[0]){
                        //console.log(res.data);
                        sessionStorage.setItem("adminAccount",res.data[0].name);
                        this.$router.push("/administrator/invoice");
                    }else{
                        alert("登录失败,请重新输入！");
                    }
                })
            },

            //波浪效果
            wave(){
                const labels=document.querySelectorAll('.form-control label');
                labels.forEach(label=>{
                    // 内容.split('')-->表示分割承单个字符
                    label.innerHTML=label.innerText.split('').map((letter,ids)=>{
                        // 内容(数组).map(值,标识)--->表示映射
                        return `<span style="transition-delay:${ids*50}ms">${letter}</span>`
                    }).join('')
                })
            }
            
                
            
        }
    }
</script>

<style>
    #administratorLogin{
        background-color: steelblue;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height:100vh;
        color:white;
    }
    #adminLogin{
        background-color: rgba(0, 0, 0, 0.4);
        padding:20px 40px;
        border-radius:5px;
        width: 380px;
    }
    #adminLogin h1{
        text-align: center;
        margin-bottom: 30px;
    }
    #adminLogin .btn{
        cursor:pointer;
        display: inline-block;
        width: 90%;
        background-color: lightblue;
        padding:15px;
        font-size:16px;
        border:0;
        border-radius:5px;
    }
    #adminLogin .bth:focus{
        outline:0;
    }
    #adminLogin .btn:active{
        transform:scale(0.98);
    }
    #adminLogin .form-control{
        position:relative;
        margin:10px 0 30px;
        width: 300px;
        background-color: transparent;
        border: none; 
    }
    #adminLogin .form-control input{
        background-color:transparent;
        display: block;
        width: 100%;
        font-size: 14px;
        color:#fff;
        height:35px;
    }
    /* 选择器:valid --->表示验证此选择器的内容是否合法 */
    #adminLogin .form-control input:focus,
    #adminLogin .form-control input:valid{
        outline:0;
        border-bottom-color:lightblue;
    }
    #adminLogin .form-control label{
        position: absolute;
        bottom:0;
        left: 15px;
        /* pointer-events-->表示设置元素是否对鼠标事件作出反应，none为不反应(默认值) */
        pointer-events: none;
        color: #fff;
    }
    #adminLogin .form-control label span{/*.form-control label span-->表示选择已被js拆分的元素的内容*/
        display: inline-block;
        font-size: 16px;
        min-width: 5px;
        transition:0.3s cubic-bezier(0.68,-0.55,0.265,1.55);
    }
    #adminLogin .form-control input:focus+label span,
    #adminLogin .form-control input:valid+label span{
        color: lightblue;
        transform: translateY(-30px);
    }
</style>