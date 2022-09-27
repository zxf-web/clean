<template>
    <div id="banner">
        <div class="row">
            <div class="col-lg-5 col-md-6" style="text-align:left;">
                <h3>我们提供最好的服务</h3>
                <p>你是否还在为清洗的问题而担忧？你是否还在为洗不干净衣服的问题而烦恼？在这里，这些问题都能帮你解决！</p>
				
                <div class="view"><a href="#about">View our</a></div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12" > 
                <div><img style="border-radius:30px;" src="../../../public/image/home/banner2.jpg" alt=""></div>
            </div>  
        </div>      
    </div>
</template>

<script>
    export default {
        name:'CarouselComponent',
        data(){
            return{
            }
        }
    }
</script>

<style>
#banner{
    height:100vh;
}
div#banner .row{
    width:100%;
    height:100%;
    background-image:url('../../../public/image/home/banner1.png');
    background-size:100% 100%;
    display:flex;
    align-items:center;
    justify-content:space-around;
    margin:0;
}

div#banner .row h3{
    font-size:50px;
	animation:bounceInDown 1s;
}

div#banner .row p{
    color:#707070;
	animation:bounceInLeft 1s;
}


div#banner .row .view{
    width:200px;
    height:50px;
	animation:bounceInRight 1s;
    background-color:#6785FF;
    font-size:20px;
    border-radius: 50px;
    text-align:center;
    padding:10px;
    color:white;
    font-weight:bolder;
    cursor:pointer;
}
div#banner .row .view:hover{
    background-color:black;
}

div#banner .row>div:last-child div{
    width:312px;
    height:312px;
    animation:bounceIn 1s;
}
div#banner .row div>img{
    width:100%;
    height:100%;
}
</style>