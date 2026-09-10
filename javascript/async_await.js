function test1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("task1");
            resolve();
        }, 4000);
    });
}

function test2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("task2");
            resolve();
        }, 2000);
    });
}
test1().then(test2)
.catch((error) => {
    console.error("Error occurred:", error);
});

async function test(){
    try{
        await test1();
        await test2();
    }
    catch(error){
        console.error("Error occurred:", error);
    }
}

test();