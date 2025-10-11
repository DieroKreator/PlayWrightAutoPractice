const { request } = require('@playwright/test');

(async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log(data);
    await apiContext.dispose();
})();