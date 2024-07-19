const cl=console.log;

const cardCon = document.getElementById("cardCon");
const form = document.getElementById("signIn");
const titleCon = document.getElementById("title");
const contentCon = document.getElementById('content');

const sweetAlert = (msg,icon) =>{
    Swal.fire({
        title:msg,
        icon:icon,
        timer:3000
    })
}


let blogsArr =[];


const createBlog = (newObj) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            let err=Math.random()>=.5 ? false:true;
            if(!err){
                blogsArr.push(newObj)
                resolve(`New Blog created Successfully`)
            }else{
                reject(`Something went wrong while creating blog`)
            }
            
        }, 1200);
    })
}

const fetchBlog =()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            let err=Math.random()>=.5 ? false:true;
            if(!err){
                resolve(blogsArr);
            }else{
                reject(`Something wrong while fetching data`)
            }
            
        }, 1400);
    })

}

const blogCard = (arr)=>{
    if(arr.length<0){
        sweetAlert(`Enter the Data `,`error`)
    }

    let res = ``;

    arr.forEach(ele=>{
        res = ` 
        
            <div class="card mt-4">
                <div class="card-header">
                    <h2>${ele.title}</h2>
                </div>
                <div class="card-body">
                    <p>
                       ${ele.content}
                    </p>
                </div>
                <div class="card-footer ">
                    <button  class="btn btn-primary btn-sm">Edit</button>
                    <button  class="btn btn-danger btn-sm">Remove</button>
    
                </div>
           </div>
          `
    })
    cardCon.innerHTML = res;

}

const onAdd = async(eve)=>{
    eve.preventDefault()

  

    try{
        let newObj={
            title:titleCon.value,
            content:contentCon.value,
        }
        cl(newObj)



        let res = await createBlog(newObj);
        cl(res);
        let data = await fetchBlog();
        blogCard(data);
    }catch(err){
        sweetAlert(err,`error`);
    }finally{
        form.reset()
    }
}







form.addEventListener("submit",onAdd)
