class APIUtils {

    constructor(apiContext)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() 
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }) //200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload)
    {
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                         },
            })
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            orderId = orderResponseJson.orders[0];   
            return orderId;
    }
}
module.exports = { APIUtils };