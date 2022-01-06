const container = document.getElementById("n4");

window.onload = () =>{
    upload_on_start();
}

async function upload_on_start(){
    const response = await fetch("/api/updates/get/1").
    then(response => response.json()).then(data => {
        container.innerHTML = data.innerHtml;
        console.log(data);
	})
}