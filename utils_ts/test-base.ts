import { test as baseTest } from '@playwright/test';
interface TestDataForOrder {
        username: string;
        password: string;
        productName: string;
    };
exports.customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
    testDataForOrder: {
        username: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3"
    }
}
);